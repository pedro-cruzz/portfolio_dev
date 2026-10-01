# Informações para os estudos de caso

Prioridade editorial: IJA System e HigiFlow, os sistemas mais complexos escolhidos por Pedro. Os 12 projetos têm uma visão técnica. Os textos descrevem o código; não atribuem automaticamente a Pedro decisões, resultados ou trabalho de outras pessoas.

Para cada um, confirmar:

1. O que você desenvolveu e por quais partes foi responsável?
2. Em que período trabalhou no projeto?
3. Foi individual ou em equipe? Quais pessoas e contribuições devem receber crédito?
4. Foi profissional, acadêmico ou pessoal? Está em desenvolvimento, concluído ou em uso?
5. Qual foi um problema concreto que você enfrentou, a decisão que tomou e por quê?
6. Qual resultado você observou e o que aprendeu? Métricas são opcionais e precisam de evidência.

## Onde preencher

`ProjectExperience`, em `lib/portfolio.ts`, oferece os campos opcionais `contribution`, `responsibilities`, `period`, `collaboration`, `credits`, `registration`, `nature`, `status`, `challenge`, `decision`, `rationale`, `outcome` e `learning`.

Só definir `confirmed: true` depois da confirmação de Pedro. Objetos não confirmados e campos vazios não são publicados. Pedro confirmou coautoria do IJA System com João Pedro, também estagiário, e o registro expedido pelo INPI. Também descreveu sua participação durante o estágio na aplicação Flask: modelagem de dados, regras de acesso, integrações com mapas, processamento de arquivos, relatórios e correções em produção. O case relata o resultado observado de conectar parte do acompanhamento antes feito em planilhas. O período exato, a divisão detalhada entre os coautores, decisões individuais específicas e métricas continuam pendentes. Quando houver uma decisão pessoal confirmada, ela substitui o bloco de leitura técnica para evitar repetição. Contexto, solução, capturas e arquitetura continuam disponíveis. HigiFlow, Mente Saudável e Pose Lab ainda descrevem os projetos sem atribuir a Pedro uma contribuição individual específica.

## Base técnica desta revisão

- IJA System: o código local em `app/shared/access.py` contém filtros de escopo por prefeitura e região. O relato não afirma que essas funções sejam de autoria individual de Pedro nem promete cobertura integral de segurança.
- Pose Lab: `src/components/study.js` liga os nomes normalizados das malhas ao catálogo; `src/data/anatomy-catalog.js` guarda nomes originais e metadados editoriais. A associação é descrita como parte do funcionamento, sem atribuir a autoria dos modelos ou da nomenclatura.

Não adicionar demonstrações, depoimentos ou métricas sem material real. Contatos e currículo continuam para outra etapa.

## Seleção confirmada

Pedro autorizou incluir Oceano Azul, IJA Drones, AeroFit, Academy Hub, Ctrl+Play e Capitalize Invest. LIAS News está excluído por orientação expressa: é um fork e não foi desenvolvido por ele. Não inferir autoria pela presença de um repositório no perfil. A autorização para apresentar os projetos não confirma contribuição exclusiva, métricas, datas ou créditos específicos.
