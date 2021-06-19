class DataSet{
    constructor(){
            this.rms;
            this.zcr;
            this.energy;
            this.spectralCentroid;
            this.spectralFlatness;
            this.spectralSlope;
            this.spectralRolloff;
            this.spectralSkewness;
            this.spectralKurtosis;
            this.loudnessTotal;
            this.perceptualSpread;
            this.perceptualSharpness;
            this.amplitudeSpectrum = [];
            this.powerSpectrum = [];
            this.chroma = [];
            this.loudness = [];
    }

    getChroma(idx){
        return this._chroma ? this._chroma[idx] : 0;
    }
    getPowerSpectrum(idx){
        return this._powerSpectrum ? this._powerSpectrum[idx] : 0;
    }

}