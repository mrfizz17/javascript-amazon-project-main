import { formatCurrancy } from "../../scripts/utils/money.js";


describe('test suite: format currency ', ()=>{
    it('converts cents into dollars',()=>{
        expect(formatCurrancy(2095)).toEqual('20.95');
    })

    it('Deals with zero',()=>{
        expect(formatCurrancy(0)).toEqual('0.00');
    })

    it('rounds up to the nearest cent ',()=>{
        expect(formatCurrancy(2000.5)).toEqual('20.01');
    })

    it('rounds down to the nearest cent ',()=>{
        expect(formatCurrancy(2000.4)).toEqual('20.00');
    });

    it('deals with negative values',()=>{
        expect(formatCurrancy(-500)).toEqual('-5.00');
    });

    
})