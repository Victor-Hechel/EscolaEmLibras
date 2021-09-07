import RespostaAlunoModel from "../model/RespostaAluno.js"

export default class RespostaController {

    static async create(req, resp) {

        try{

            const respostaAluno = await 
                new RespostaAlunoModel({
                    tarefa: req.body.tarefaId,
                    aluno: req.user._id,
                    dataResposta: new Date()
                }).save()

            resp.status(201).json({
                id: respostaAluno._id,
                tarefa: respostaAluno.tarefa,
                aluno: respostaAluno.aluno,
                dataResposta: respostaAluno.dataResposta
            })

        }catch(err){
            console.log(err)
            resp.status(500).json({
                mensagem: "Erro ao tentar criar resposta"
            })
        }

    }

}