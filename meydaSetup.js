let analyzer;

let rms,zcr,energy;
let buffer, spectralCentroid;
let spectralKurtosis;



let amplitudeSpectrum;

let spectralSpread, spectralFlatness;

function meydaSetup(){

    if(typeof Meyda === "undefined"){
        console.log('h');
    } else {
        analyzer = Meyda.createMeydaAnalyzer({
            "audioContext" : getAudioContext(),
            "source" : sound,
            "bufferSize" : 512,
            "featureExtractors":
            [
                "rms", "zcr","energy",
                "buffer", 
                "spectralCentroid",
                "spectralKurtosis", 
                "spectralFlatness"
            ],

            "callback" : features => {
                rms = features.rms * 500;
                zcr = features.zcr;
                energy = features.energy;
                spectralCentroid = features.spectralCentroid;
                buffer = features.buffer;
                spectralKurtosis = features.spectralKurtosis;
                spectralFlatness = features.spectralFlatness;

            }
        })
    }

    analyzer.start();
}