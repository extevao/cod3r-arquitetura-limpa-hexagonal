import { soma } from '../src/calc'

test('deve somar dois numeros', () => {

    expect(soma(1, 2)).toBe(4)
})