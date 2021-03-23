import { AudioContext } from 'standardized-audio-context';
export class ImpulsePlayer {
  constructor() {
    this.audioCtx = new AudioContext();
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
  }

  async init(sampleFile, impulseFile) {
    this.sampleBuffer = await this.setSampleBuffer(sampleFile);
    this.sampleNode = await this.setSampleNode();
    if (impulseFile) {
      this.impulseBuffer = await this.setImpulseBuffer(impulseFile);
      this.impulseNode = await this.setImpulseNode();
      this.convolverNode = await this.setConvolverNode();
    }
    this.impulseGain.gain.setValueAtTime(
      0.7,
      this.audioCtx.currentTime,
    );
    this.makeConnections();
    return true;
  }

  async setSampleNode() {
    // Set sample node from buffer
    const sampleNode = this.audioCtx.createBufferSource();
    sampleNode.buffer = await this.audioCtx.decodeAudioData(
      this.sampleBuffer.slice(0),
    );
    return sampleNode;
  }

  async setSampleBuffer(sample) {
    // Set sample buffer from file
    const sampleBuffer = await sample.arrayBuffer();
    return sampleBuffer;
  }

  async setImpulseNode() {
    // Set sample node from buffer
    const impulseNode = this.audioCtx.createBufferSource();
    impulseNode.buffer = await this.audioCtx.decodeAudioData(
      this.impulseBuffer.slice(0),
    );
    return impulseNode;
  }

  async setImpulseBuffer(impulse) {
    // Set impulse buffer from file
    const impulseBuffer = await impulse.arrayBuffer();
    return impulseBuffer;
  }

  async setNewImpulse(impulse) {
    this.impulseBuffer = await this.setImpulseBuffer(impulse);
    this.impulseNode = await this.setImpulseNode();
    this.convolverNode.buffer = await this.audioCtx.decodeAudioData(
      this.impulseBuffer.slice(0),
    );
    this.makeConnections();
    return true;
  }

  async setConvolverNode() {
    // Create and set new convolver node
    if (this.convolverNode) {
      this.convolverNode.disconnect();
    }
    const convolverNode = this.audioCtx.createConvolver();
    convolverNode.buffer = await this.audioCtx.decodeAudioData(
      this.impulseBuffer.slice(0),
    );
    return convolverNode;
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
    }

    this.sampleGain.gain.setValueAtTime(
      this.cleanVolume,
      this.audioCtx.currentTime,
    );
    this.sampleGain.connect(this.audioCtx.destination);
  }

  async togglePlay() {
    if (!this.playing) {
      this.sampleNode.connect(this.sampleGain);
      this.sampleNode.start();
      this.playing = !this.playing;
      return 'stop';
    } else {
      this.sampleNode.stop();
      this.playing = !this.playing;
      this.sampleNode = await this.setSampleNode();
      this.makeConnections();
      return 'play';
    }
  }

  async playImpulse() {
    // connect the sampleNode and play
    this.impulseNode = await this.setImpulseNode();
    this.impulseNode.connect(this.audioCtx.destination);
    this.impulseNode.start();
    return true;
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
