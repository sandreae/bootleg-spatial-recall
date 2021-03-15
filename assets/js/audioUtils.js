import { AudioContext } from 'standardized-audio-context';
export class ImpulsePlayer {
  constructor() {
    this.audioCtx = new AudioContext();
    this.analyserNode = this.audioCtx.createAnalyser();
    this.convolverGain = this.audioCtx.createGain();
    this.sampleGain = this.audioCtx.createGain();
    this.impulseGain = this.audioCtx.createGain();
    this.sample = null;
    this.sampleBuffer = null;
    this.impulseBuffer = null;
    this.convolverNode = null;
    this.sampleNode = null;
    this.impulseNode = null;
    this.cleanVolume = 0.5;
    this.wetVolume = 0.5;
    this.playing = false;

    this.analyserNode.fftSize = 2048;
  }

  async init(sampleFile, impulseFile) {
    await this.setSampleBuffer(sampleFile);
    await this.setSampleNode();
    if (impulseFile) {
      await this.setImpulseBuffer(impulseFile);
      await this.setImpulseNode();
      await this.setConvolverNode();
    }
    this.impulseGain.gain.setValueAtTime(
      0.7,
      this.audioCtx.currentTime,
    );
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

  async setImpulseNode() {
    // Set sample node from buffer
    this.impulseNode = this.audioCtx.createBufferSource();
    this.impulseNode.buffer = await this.audioCtx.decodeAudioData(
      this.impulseBuffer.slice(0),
    );
  }

  async setImpulseBuffer(impulse) {
    // Set impulse buffer from file
    this.impulseBuffer = await impulse.arrayBuffer();
  }

  async setNewImpulse(impulse) {
    await this.setImpulseBuffer(impulse);
    await this.setImpulseNode();
    await this.setConvolverNode();
    this.makeConnections();
  }

  async setConvolverNode() {
    // Create and set new convolver node
    if (this.convolverNode) {
      this.convolverNode.disconnect();
    }
    this.convolverNode = this.audioCtx.createConvolver();
    this.convolverNode.buffer = await this.audioCtx.decodeAudioData(
      this.impulseBuffer.slice(0),
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

  togglePlay() {
    if (!this.playing) {
      this.sampleNode.connect(this.sampleGain);
      this.sampleNode.start();
      this.playing = !this.playing;
    } else {
      this.sampleNode.stop();
      this.playing = !this.playing;
      this.setSampleNode();
      this.makeConnections();
    }
  }

  async playImpulse() {
    // connect the sampleNode and play
    this.impulseNode.connect(this.audioCtx.destination);
    this.impulseNode.start();
    await this.setImpulseNode();
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
