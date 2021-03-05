export class ImpulsePlayer {
  constructor() {
    this.audioCtx = new AudioContext();
    this.analyserNode = this.audioCtx.createAnalyser();
    this.convolverGain = this.audioCtx.createGain();
    this.sampleGain = this.audioCtx.createGain();
    this.sample = null;
    this.sampleBuffer = null;
    this.convolverNode = null;
    this.sampleNode = null;
    this.cleanVolume = 0.5;
    this.wetVolume = 0.5;

    this.analyserNode.fftSize = 2048;
  }

  async init(sampleFile, impulseFile) {
    await this.setSampleBuffer(sampleFile);
    await this.setSampleNode();
    if (impulseFile) {
      await this.setConvolverNode(impulseFile);
    }
    this.makeConnections();
  }

  async setSampleNode() {
    // Set sample node from buffer
    this.sampleNode = this.audioCtx.createBufferSource();
    this.sampleNode.buffer = await this.audioCtx.decodeAudioData(
      this.sampleBuffer.slice(0),
    );
  }

  async setSampleBuffer(sample) {
    // Set sample buffer from file
    this.sampleBuffer = await sample.arrayBuffer();
  }

  async setConvolverNode(impulse) {
    // Create and set new convolver node
    if (this.convolverNode) {
      this.convolverNode.disconnect();
    }
    this.convolverNode = this.audioCtx.createConvolver();
    const arraybuffer = await impulse.arrayBuffer();
    this.convolverNode.buffer = await this.audioCtx.decodeAudioData(
      arraybuffer,
    );
  }

  makeConnections() {
    // Make all audio connections
    if (this.convolverNode) {
      this.convolverNode.connect(this.convolverGain);
      this.sampleNode.connect(this.convolverNode);

      this.convolverGain.gain.setValueAtTime(
        this.wetVolume,
        this.audioCtx.currentTime,
      );
      this.convolverGain.connect(this.audioCtx.destination);
      this.convolverGain.connect(this.analyserNode);
    }

    this.sampleGain.gain.setValueAtTime(
      this.cleanVolume,
      this.audioCtx.currentTime,
    );
    this.sampleGain.connect(this.audioCtx.destination);
    this.sampleGain.connect(this.analyserNode);
  }

  play() {
    // connect the sampleNode and play
    this.sampleNode.connect(this.sampleGain);
    this.sampleNode.start();
  }

  stop() {
    // Stop the sample node playing, which also destroys it
    this.sampleNode.stop();
  }

  mixLevel(val) {
    val -= 1;
    val = val < 0 ? 0 : val;
    val = val > 20 ? 20 : val;
    this.cleanVolume = 1 - val / 20;
    this.wetVolume = val / 20;
    this.sampleGain.gain.setValueAtTime(
      this.cleanVolume,
      this.audioCtx.currentTime,
    );
    this.convolverGain.gain.setValueAtTime(
      this.wetVolume,
      this.audioCtx.currentTime,
    );
  }
}
