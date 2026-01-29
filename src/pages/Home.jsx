import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CourseRoadmap from '../components/CourseRoadmap';
import Icon from '../components/Icon';
import SEO from '../components/SEO';

const faqData = [
  {
    question: 'O que é AI Engineering?',
    answer: 'AI Engineering é a disciplina de construir aplicações práticas com inteligência artificial, especialmente Large Language Models (LLMs). Envolve integrar modelos como GPT e Claude em produtos reais, usar técnicas como RAG e Agents, e colocar tudo em produção.'
  },
  {
    question: 'A trilha de AI Engineer é gratuita?',
    answer: 'Sim, todo o conteúdo da trilha é 100% gratuito. Vídeos, artigos e materiais de apoio estão disponíveis sem custo. O objetivo é democratizar o conhecimento de AI Engineering no Brasil.'
  },
  {
    question: 'Preciso saber programar para começar?',
    answer: 'Conhecimento básico de programação ajuda, mas não é obrigatório. A trilha começa do zero e vai evoluindo. Se você sabe o básico de Python ou JavaScript, já consegue acompanhar a maioria do conteúdo.'
  },
  {
    question: 'Qual a diferença entre AI Engineer e Data Scientist?',
    answer: 'Data Scientists focam em análise de dados e criação de modelos. AI Engineers focam em usar modelos prontos (como GPT, Claude) para construir aplicações práticas. É mais sobre integração e desenvolvimento de produto do que sobre treinar modelos.'
  }
];

function Home() {
  return (
    <>
      <SEO
        title="Comunidade de AI Engineering"
        description="A comunidade brasileira de AI Engineering. Aprenda a construir com LLMs, Agents, RAG e as ferramentas que estão mudando a programação."
        keyword="ai engineering brasil comunidade llm agents rag"
        canonicalUrl="https://aiengineer.com.br"
        faq={faqData}
      />
      {/* ==================== HERO ==================== */}
      <section className="min-h-screen flex items-center justify-center pt-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="heading-xl mb-6"
            >
              Bora aprender <span className="text-gradient">AI Engineering</span> de verdade
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto"
            >
              Sem enrolação, sem firula. LLMs, Agents, RAG - tudo na prática,
              sempre atualizado.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/trilha"
                className="btn-primary"
              >
                <Icon name="brain" className="w-5 h-5" />
                <span>Começar a Trilha</span>
              </Link>
              <a
                href="#comunidade"
                className="btn-secondary"
              >
                <span>Entrar na Comunidade</span>
                <Icon name="arrow" className="w-5 h-5" />
              </a>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ==================== PARA QUEM É ==================== */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Pra quem é isso aqui?</h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              Se tu se encaixa em algum desses, cola com a gente
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: 'brain',
                title: 'Dev curioso',
                desc: 'Quer meter a mão na massa e construir coisas reais com IA'
              },
              {
                icon: 'rocket',
                title: 'Empreendedor',
                desc: 'Tá montando produto ou startup e precisa de IA pra ontem'
              },
              {
                icon: 'code',
                title: 'Migrando pra área',
                desc: 'Quer entrar no mundo de IA mas não sabe por onde começar'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8"
              >
                <div className="icon-container mb-6">
                  <Icon name={item.icon} className="w-6 h-6" />
                </div>
                <h3 className="heading-md mb-3">{item.title}</h3>
                <p className="text-[var(--text-secondary)]">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12 text-lg text-[var(--text-secondary)]"
          >
            "Aqui não tem mimimi. <span className="text-[var(--sunset-400)]">É código na veia.</span> Problema real, solução real."
          </motion.p>
        </div>
      </section>

      <hr className="divider" />

      {/* ==================== CURSO ==================== */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge mb-6">
                <Icon name="sparkle" className="w-3 h-3" />
                Saindo do forno
              </span>
              <h2 className="heading-lg mb-6">
                Curso de <span className="text-gradient">AI Engineering</span> completo
              </h2>
              <p className="text-[var(--text-secondary)] text-lg mb-8">
                De graça. Sem pegadinha. Conteúdo que evolui junto com a área.
                Vídeos, artigos e tudo que tu precisa saber.
              </p>
              <Link
                to="/trilha"
                className="btn-primary"
              >
                <Icon name="brain" className="w-5 h-5" />
                <span>Acessar a Trilha</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card-static p-8"
            >
              <h3 className="heading-md mb-6 text-[var(--sunset-300)]">O que tu vai aprender</h3>
              <ul className="space-y-4">
                {[
                  'Como LLMs funcionam de verdade',
                  'RAG e busca semântica',
                  'Agents que fazem coisa',
                  'Prompt que funciona',
                  'Colocar em produção sem dor'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-sm font-semibold text-[var(--sunset-400)]">
                      {i + 1}
                    </span>
                    <span className="text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== ROADMAP ==================== */}
      <CourseRoadmap />

      {/* ==================== SKILLS ==================== */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">As paradas que tu vai dominar</h2>
            <p className="text-[var(--text-secondary)] text-lg">
              O que realmente importa pra construir com IA hoje
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'LLM Ops', desc: 'Botar modelo pra rodar de verdade, sem gambiarra' },
              { title: 'Agents', desc: 'Agentes que pensam, planejam e resolvem' },
              { title: 'RAG', desc: 'Busca inteligente, embeddings e contexto' },
              { title: 'Dev Tools', desc: 'Cursor, Claude Code, V0 - as ferramentas brabas' },
              { title: 'Prompting', desc: 'Fazer a IA entender o que tu quer' },
              { title: 'Frameworks', desc: 'LangChain, Vercel AI SDK, CrewAI e cia' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-6"
              >
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ==================== QUEM FAZ ==================== */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card-static p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <img
                  src="/eduardo.jpg"
                  alt="Eduardo - AI Engineer e criador do AI Engineer Brasil"
                  className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 ring-2 ring-[var(--sunset-500)] ring-offset-2 ring-offset-[var(--bg-base)]"
                />
                <div className="text-center md:text-left">
                  <h3 className="heading-md mb-1">@eduwxyz</h3>
                  <p className="text-[var(--sunset-400)] text-sm mb-4">AI Engineer</p>
                  <p className="text-[var(--text-secondary)] mb-6">
                    "Criei isso aqui porque não achava conteúdo bom em português.
                    Então resolvi fazer o conteúdo que eu queria ter encontrado quando comecei."
                  </p>
                  <div className="flex gap-3 justify-center md:justify-start">
                    {[
                      { icon: 'youtube', href: 'https://youtube.com/@eduwxyz' },
                      { icon: 'twitter', href: 'https://twitter.com/eduwxyz' },
                      { icon: 'github', href: 'https://github.com/eduwxyz' }
                    ].map((link, i) => (
                      <a
                        key={i}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center hover:bg-[var(--bg-card-hover)] hover:border-[var(--glass-border-hover)] transition-all"
                      >
                        <Icon name={link.icon} className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Perguntas frequentes</h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Tudo que você precisa saber antes de começar
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-6"
              >
                <h3 className="heading-md mb-3">{item.question}</h3>
                <p className="text-[var(--text-secondary)]">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ==================== COMUNIDADE ==================== */}
      <section id="comunidade" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">Cola com a gente</h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Escolhe por onde tu quer acompanhar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'youtube',
                title: 'YouTube',
                desc: 'Vídeos, tutoriais e o curso completo saindo toda semana',
                cta: 'Se inscrever',
                href: 'https://www.youtube.com/@eduwxyz?sub_confirmation=1'
              },
              {
                icon: 'whatsapp',
                title: 'WhatsApp',
                desc: 'Grupo pra trocar ideia e tirar dúvida com a galera',
                cta: 'Entrar no grupo',
                href: 'https://chat.whatsapp.com/CAFmRcz7UASLkbWBrVA6IC'
              },
              {
                icon: 'discord',
                title: 'Discord',
                desc: 'Servidor pra trocar ideia, networking e tirar dúvidas',
                cta: 'Entrar no Discord',
                href: 'https://discord.gg/yHspjjjf'
              },
              {
                icon: 'mail',
                title: 'Newsletter',
                desc: 'Resumo semanal do que tá rolando em IA',
                cta: 'Assinar',
                href: 'https://eduwxyz.substack.com'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 flex flex-col"
              >
                <div className="icon-container mb-6">
                  <Icon name={item.icon} className="w-6 h-6" />
                </div>
                <h3 className="heading-md mb-3">{item.title}</h3>
                <p className="text-[var(--text-secondary)] mb-6 flex-1">{item.desc}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                >
                  <span>{item.cta}</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
