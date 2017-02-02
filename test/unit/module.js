import * as jsonMidiEncoder from '../../src/module';
import { loadFixtureAsArrayBuffer, loadFixtureAsJson } from '../helper/load-fixture';

describe('module', () => {

    describe('encode()', () => {

        leche.withData({
            'SubTractor 1': [ 'SubTractor 1.mid.txt', 'SubTractor 1.json' ],
            'SubTractor 2': [ 'SubTractor 2.mid', 'SubTractor 2.json' ],
            'because': [ 'because.mid', 'because.json' ],
            'scale': [ 'scale.mid', 'scale.json' ]
        }, (midiFilename, jsonFilename) => {

            it('should encode the json object', function (done) {
                this.timeout(4000);

                loadFixtureAsArrayBuffer(midiFilename, (err, arrayBuffer) => {
                    expect(err).to.be.null;

                    loadFixtureAsJson(jsonFilename, (err, json) => {
                        expect(err).to.be.null;

                        jsonMidiEncoder
                            .encode(json)
                            .then((midiFile) => {
                                expect(new Uint8Array(midiFile)).to.deep.equal(new Uint8Array(arrayBuffer));

                                done();
                            });
                    });
                });
            });

            it('should refuse to encode a none json object', function (done) {
                this.timeout(4000);

                loadFixtureAsArrayBuffer(midiFilename, (err, arrayBuffer) => {
                    expect(err).to.be.null;

                    jsonMidiEncoder
                        .encode(arrayBuffer)
                        .catch((err) => {
                            expect(err.message).to.equal('The given JSON object seems to be invalid.');

                            done();
                        });
                });
            });

        });

    });

});