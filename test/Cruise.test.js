import { expect } from 'chai';
import 'babel-polyfill'
import Constans from '../src/components/common/constants';

describe("Cruise test1", function() {
    let inputPatter = null;
    beforeEach(function(){
      inputPatter = Constans.MULTIPL_SOURCE_FORMATE;
    });
    it('input regexp patter test', function() {
        expect(inputPatter.test('chrome')).to.be.ok;
        expect(inputPatter.test('111')).to.be.ok;
        expect(inputPatter.test('chrome111')).to.be.ok;
        expect(inputPatter.test('chrome,firefox')).to.be.ok;
        expect(inputPatter.test('firefox,')).not.to.be.ok;
        expect(inputPatter.test(',chrome')).not.to.be.ok;
    });

});