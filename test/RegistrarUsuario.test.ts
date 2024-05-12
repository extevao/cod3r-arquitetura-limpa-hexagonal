import BancoEmMemoria from "../src/exemplo/adaptadores/db/BancoEmMemoria"
import InverterSenha from "../src/exemplo/adaptadores/auth/InverterSenha"
import RegistrarUsuario from "../src/exemplo/app/usuario/RegistrarUsuario"
import SenhaComEspaco from "../src/exemplo/adaptadores/auth/SenhaComEspaco"
import CriptoReal from "../src/exemplo/adaptadores/auth/CriptoReal"


test('deve registrar um usuario invertendo a senha', () => {
  const colecao = new BancoEmMemoria()
  const cripto = new InverterSenha()

  const casoDeUso = new RegistrarUsuario(
    colecao,
    cripto
  )

  const usuario = casoDeUso.executar('João', 'joao@email.com', '1234')

  expect(usuario).toHaveProperty('id')
  expect(usuario.nome).toBe('João')
  expect(usuario.senha).toBe('4321')

})

test('deve registrar um usuario com senha com espacos', () => {
  const colecao = new BancoEmMemoria()
  const cripto = new SenhaComEspaco()

  const casoDeUso = new RegistrarUsuario(
    colecao,
    cripto
  )

  const usuario = casoDeUso.executar('João', 'joao@email.com', '1234')

  expect(usuario).toHaveProperty('id')
  expect(usuario.nome).toBe('João')
  expect(usuario.senha).toBe('1 2 3 4')

})


test('deve registrar um usuario com bcrypt', () => {
  const colecao = new BancoEmMemoria()
  const provedorCripto = new CriptoReal()

  const casoDeUso = new RegistrarUsuario(
    colecao,
    provedorCripto
  )

  const usuario = casoDeUso.executar('João', 'joao@email.com', '1234')

  expect(usuario).toHaveProperty('id')
  expect(usuario.nome).toBe('João')
  expect(provedorCripto.comparar('1234', usuario.senha!)).toBeTruthy()

})
