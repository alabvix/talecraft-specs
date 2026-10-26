# Proposal: RF009 — Facções

## Why
Criar o cadastro e o gerenciamento de **Facções** no Worldbuilding e a associação entre Facções e Personagens, permitindo que um personagem pertença a mais de uma facção com papel **Líder** ou **Membro**, com reflexo nas duas telas (detalhe do Mundo e detalhe do Personagem).

## Contexto
O projeto já possui Personagens (RF004/RF005/RF006) e Worldbuilding com Mundos e Entradas do Mundo (RF007/RF008). O RF008 tratava inicialmente de entradas, mas as Facções foram movidas para um requisito próprio (RF009). A necessidade é cadastrar organizações/facções/seitas/empresas vinculadas a um Mundo e relacioná-las aos Personagens, com gerenciamento direto no cadastro do Personagem.

## What Changes
- Aba **Facções** na tela de detalhe do Mundo (após as demais abas), com tabela + paginação e janela responsiva para inclusão/edição.
- Cadastro da Fação com campos: **Nome** (obrigatório), **Tipo** (lista fechada: Política, Religiosa, Militar, Comercial/Empresa, Seita, Criminosa, Outra), **Ideologia/Objetivos**, **Líder(es)**, **Base/Território**, **Descrição** e **História**.
- Associação **N:N** entre Personagem e Fação, com **papel** obrigatório por associação (**Líder** ou **Membro**).
- Gerenciamento de associações a partir da **tela de detalhe do Personagem** (adicionar/remover/alterar papel), com exibição das facções e papéis.
- Reflexo bidirecional na interface entre Mundo/Facções e Personagem.
- Sem duplicidade da mesma associação (mesmo Personagem e mesma Fação).
- Migração aditiva do esquema (sem recriar/apagar dados existentes).
- Sem exclusão definitiva forçada neste requisito (foco em inclusão/edição/gestão).

## Fora do escopo
- Associação de Facções a Livros/Capítulos (pertence a requisitos posteriores).
- Funcionalidades globais de Facções fora das abas do Mundo e do painel no Personagem.
- Reestruturação ampla dos domínios já existentes.

## Critérios de pronto (baseado em RF009)
Atender RF009-CA001 a RF009-CA006: aba Facções presente e funcional; cadastro com validações; associação com papel Líder/Membro; personagem pode pertencer a várias facções; gerenciamento no detalhe do Personagem; consistência e sem duplicidade.
