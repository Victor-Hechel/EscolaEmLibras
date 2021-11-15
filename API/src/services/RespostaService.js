import QuestaoModel from "../model/Questao.js"
import QuestaoMultiplaModel from "../model/QuestaoMultipla.js"
import RespostaModel from "../model/Resposta.js"
import RespostaAlunoModel from "../model/RespostaAluno.js"
import QuestaoRespostaModel from "../model/QuestaoResposta.js"
import QuestaoMultiplaRespostaModel from "../model/QuestaoMultiplaResposta.js"
import QuestaoEscritaRespostaModel from "../model/QuestaoEscritaResposta.js"
import QuestaoEscritaModel from "../model/QuestaoEscrita.js"
import QuestaoParesRespostaModel from "../model/QuestaoParesResposta.js"
import QuestaoParesModel from "../model/QuestaoPares.js"

export default class RespostaService {

    async responderQuestao(respostaId, questaoId, respostaAluno){
        
        const estaCorreta = await this.estaCorreta(questaoId, respostaAluno)

        const questao = await QuestaoModel.findById(questaoId)
        
        const gabarito = await this.carregarGabarito(questao.tarefaId)

        const questaoGabarito = gabarito.questoes.filter(q => q.questao == questaoId)[0]

        var respostaQuestao
        var respostaCerta

        if(questao instanceof QuestaoMultiplaModel){
            respostaCerta = questaoGabarito.alternativa
            respostaQuestao = await new QuestaoMultiplaRespostaModel({
                resposta: respostaId,
                questao: questaoId,
                alternativa: respostaAluno
            }).save()
        }else if(questao instanceof QuestaoEscritaModel){
            respostaCerta = questaoGabarito.respostaQuestao
            respostaQuestao = await new QuestaoEscritaRespostaModel({
                resposta: respostaId,
                questao: questaoId,
                respostaQuestao: respostaAluno
            }).save()
        }else if(questao instanceof QuestaoParesModel){
            respostaCerta = questaoGabarito.pares
            respostaQuestao = await new QuestaoParesRespostaModel({
                resposta: respostaId,
                questao: questaoId,
                pares: respostaAluno
            }).save()
        }

        return {
            resposta: respostaQuestao,
            resultado: {
                estaCorreta: estaCorreta,
                certa: respostaCerta
            }

        }
    }

    async carregarGabarito(tarefaId) {
        const gabarito = await RespostaModel.findOne({
            kind: null,
            tarefa: tarefaId
        })

        gabarito.questoes = await Promise.all(
            gabarito.questoes.map(async questaoId => 
                await QuestaoRespostaModel.findById(questaoId)))


        return gabarito
    }

    async estaCorreta(questaoId, respostaAluno) {
        const questao = await QuestaoModel.findById(questaoId)
        
        const gabarito = await this.carregarGabarito(questao.tarefaId)

        const questaoGabarito = gabarito.questoes.filter(q => q.questao.equals(questaoId))[0]
        if (questaoGabarito instanceof QuestaoMultiplaRespostaModel) {
            return questaoGabarito.alternativa.equals(respostaAluno)
        }else if (questaoGabarito instanceof QuestaoEscritaRespostaModel) {
            return this.formatarRespostaEscrita(questaoGabarito.respostaQuestao) == this.formatarRespostaEscrita(respostaAluno)
        }else if (questaoGabarito instanceof QuestaoParesRespostaModel) {
            return this.listaDeParesEhIgual(questaoGabarito.pares, respostaAluno)
        }

        return false
    }

    formatarRespostaEscrita(respostaEscrita){
        if(respostaEscrita == null)
            return ""
        return respostaEscrita.trim().toLowerCase().replace(/ {2,}/gm, " ")
    }

    listaDeParesEhIgual(paresGabarito, paresResposta){
        for(const parGabarito of paresGabarito){
            const encontrouPar = paresResposta.some(x => parGabarito.colunaEsquerda.equals(x.colunaEsquerda) &&
                parGabarito.colunaDireita.equals(x.colunaDireita))

            if(!encontrouPar)
                return false
        }

        return true
    }

    async carregar(id) {
        const resposta = await RespostaAlunoModel.findById(id)
        
        const gabarito = await this.carregarGabarito(resposta.tarefa)

        const questoesRespostasDto = []

        resposta.questoes = await QuestaoRespostaModel.find({ resposta: resposta._id }) 

        for(const questaoResposta of resposta.questoes){
            const questaoRespostaModel = await QuestaoRespostaModel.findById(questaoResposta)
            
            const questaoRespostaDto = { 
                id: questaoRespostaModel._id, 
                tarefaId: resposta.tarefa,
                questao: questaoRespostaModel.questao,
                kind: questaoRespostaModel.kind
            }
            
            if(questaoRespostaModel instanceof QuestaoMultiplaRespostaModel){
                questaoRespostaDto.alternativa = questaoRespostaModel.alternativa
            }else if(questaoRespostaModel instanceof QuestaoEscritaRespostaModel){
                questaoRespostaDto.respostaQuestao = questaoRespostaModel.respostaQuestao
            }else if(questaoRespostaModel instanceof QuestaoParesRespostaModel){
                questaoRespostaDto.pares = questaoRespostaModel.pares
            }

            questoesRespostasDto.push(questaoRespostaDto)
        }

        const retorno = {
            id: resposta._id,
            tarefaId: resposta.tarefa,
            questoes: await Promise.all(questoesRespostasDto.map(async q => ({
                respostaAluno: {
                    ...q,
                    certa: await this.estaCorreta(q.questao, this._getRespondido(q))
                }
            })))
        }

        retorno.pontos = retorno.questoes.reduce((pontos, q) => pontos + (q.respostaAluno.certa ? 10 : 0), 0)

        return retorno
    }

    _getRespondido(respostaAluno){
        var respondido = null
        if(respostaAluno.kind === 'QuestaoEscritaResposta')
            respondido = respostaAluno.respostaQuestao
        else if(respostaAluno.kind === 'QuestaoMultiplaResposta')
            respondido = respostaAluno.alternativa
        else if(respostaAluno.kind === 'QuestaoParesResposta')
            respondido = respostaAluno.pares
        return respondido
    }
}