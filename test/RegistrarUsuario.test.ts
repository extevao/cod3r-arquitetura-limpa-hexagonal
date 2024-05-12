import BancoEmMemoria from "../src/BancoEmMemoria"
import InverterSenha from "../src/InverterSenha"
import RegistrarUsuario from "../src/RegistrarUsuario"
import SenhaComEspaco from "../src/SenhaComEspaco"


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
