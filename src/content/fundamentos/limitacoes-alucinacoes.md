---
video: null
---

## Limitações e Alucinações

LLMs erram. Às vezes de formas sutis, às vezes de formas absurdas. Saber onde e por que eles falham é essencial pra construir produtos que funcionem.

### O que são alucinações

Alucinação é quando o modelo gera informação que parece correta mas é inventada. Não é um bug — é uma consequência de como LLMs funcionam.

O modelo foi treinado pra gerar texto plausível, não pra verificar fatos. Quando ele não sabe algo, ele não diz "não sei". Ele continua gerando texto que parece fazer sentido.

```
Pergunta: "Quem escreveu o livro 'A Montanha Mágica'?"
Resposta correta: Thomas Mann

Pergunta: "Quem escreveu o livro 'O Vale dos Sonhos Perdidos'?"
Resposta do modelo: "José Eduardo Agualusa" (inventado - esse livro não existe)
```

O modelo não distingue "eu sei disso" de "isso parece plausível". Pra ele, gerar uma resposta inventada é tão natural quanto gerar uma correta.

### Por que alucinações acontecem

**O modelo não tem acesso a fatos**. Ele aprendeu padrões estatísticos de texto. Quando você pergunta algo, ele gera a resposta mais provável dado o padrão, não a resposta factualmente correta.

**Pressão pra responder**. O modelo foi treinado pra ser útil e responder perguntas. Dizer "não sei" foi penalizado durante o treinamento. Então ele sempre tenta dar uma resposta.

**Dados de treinamento desatualizados**. O modelo tem um "corte de conhecimento" — ele não sabe de nada que aconteceu depois do treinamento. Pergunte sobre eventos recentes e ele vai inventar.

### Tipos comuns de erros

**Fatos inventados**: Datas, nomes, estatísticas que parecem reais mas não são.

**Fontes falsas**: "Segundo estudo da Universidade de Harvard..." — o estudo não existe.

**Lógica quebrada**: O modelo segue uma cadeia de raciocínio que parece fazer sentido mas tem falhas.

**Mistura de informações**: Combina fatos de diferentes contextos de forma errada.

**Confiança excessiva**: Afirma coisas com certeza mesmo quando está errado.

### O que não funciona pra resolver

**Pedir pro modelo ter certeza**: "Só responda se tiver certeza absoluta" — não funciona. O modelo não tem mecanismo interno de "certeza".

**Temperatura zero**: Reduz variação mas não elimina erros. O modelo ainda pode gerar a resposta errada mais provável.

**Perguntar se ele está certo**: O modelo vai dizer que está certo mesmo quando não está.

### O que funciona

**RAG (Retrieval Augmented Generation)**: Em vez de confiar no conhecimento do modelo, você busca informação em fontes confiáveis e passa pro modelo junto com a pergunta. Reduz alucinações drasticamente.

```excalidraw
{"elements":[{"type":"rectangle","x":20,"y":30,"width":120,"height":100,"strokeColor":"#e07a5f","backgroundColor":"transparent","fillStyle":"hachure","strokeWidth":2,"roughness":1,"roundness":{"type":3},"id":"left","seed":1},{"type":"text","x":45,"y":45,"width":70,"height":25,"text":"Sem RAG","fontSize":16,"fontFamily":2,"strokeColor":"#ffffff","id":"t1","seed":2},{"type":"text","x":35,"y":80,"width":90,"height":40,"text":"Alucina\nInventa fatos","fontSize":14,"fontFamily":2,"strokeColor":"#a1a1aa","id":"t2","seed":3},{"type":"rectangle","x":180,"y":30,"width":120,"height":100,"strokeColor":"#81b29a","backgroundColor":"transparent","fillStyle":"hachure","strokeWidth":2,"roughness":1,"roundness":{"type":3},"id":"right","seed":4},{"type":"text","x":200,"y":45,"width":80,"height":25,"text":"Com RAG","fontSize":16,"fontFamily":2,"strokeColor":"#ffffff","id":"t3","seed":5},{"type":"text","x":195,"y":80,"width":90,"height":40,"text":"Busca docs\nFatos reais","fontSize":14,"fontFamily":2,"strokeColor":"#a1a1aa","id":"t4","seed":6},{"type":"text","x":150,"y":70,"width":20,"height":25,"text":"vs","fontSize":14,"fontFamily":2,"strokeColor":"#71717a","id":"vs","seed":7}]}
```

```python
# Em vez de:
response = chat("Qual a política de devolução da empresa?")

# Faça:
documentos = buscar_documentos("política devolução")
response = chat(f"""
Baseado nos documentos abaixo, responda a pergunta.
Se a informação não estiver nos documentos, diga que não sabe.

Documentos:
{documentos}

Pergunta: Qual a política de devolução da empresa?
""")
```

**Instrua a dizer "não sei"**: Funciona parcialmente. Incluir no prompt que o modelo deve admitir quando não sabe ajuda, mas não é garantia.

**Verificação externa**: Pra casos críticos, valide a saída do modelo com outras fontes ou regras de negócio.

**Citação de fontes**: Peça pro modelo citar de onde veio a informação. Se ele não conseguir citar, provavelmente inventou.

### Outras limitações importantes

**Matemática**: LLMs são ruins em cálculos. Eles acertam contas simples porque viram muitos exemplos, mas erram facilmente em aritmética mais complexa. Use ferramentas externas pra cálculos.

**Raciocínio lógico**: Parecem raciocinar bem, mas falham em problemas que exigem lógica rigorosa. Técnicas como chain-of-thought ajudam, mas não resolvem completamente.

**Conhecimento recente**: Não sabem de nada depois do corte de conhecimento. Pra informação atual, você precisa de RAG ou acesso à web.

**Contexto muito longo**: Mesmo com janelas grandes, modelos têm dificuldade em usar informação que está no "meio" do contexto.

**Tarefas específicas de domínio**: Um modelo generalista pode não performar bem em áreas muito técnicas sem fine-tuning ou prompts especializados.

### Mentalidade certa

Não trate LLM como fonte de verdade. Trate como um assistente muito capaz mas que precisa de supervisão.

Em produção:
- Use RAG pra grounding em fatos
- Valide saídas críticas
- Tenha fallbacks pra quando o modelo erra
- Monitore padrões de erro

Alucinações não vão desaparecer. Os modelos estão melhorando, mas a característica é fundamental à arquitetura. Seu trabalho é construir sistemas que funcionem apesar disso.
