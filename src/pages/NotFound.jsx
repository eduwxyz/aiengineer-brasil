import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import SEO from '../components/SEO';

function NotFound() {
  return (
    <>
      <SEO
        title="Página não encontrada"
        description="A página que você está procurando não existe ou foi movida. Volte para a página inicial e explore o conteúdo de AI Engineering."
        canonicalUrl="https://aiengineer.com.br/404"
        noIndex={true}
      />

      <section className="min-h-screen flex items-center justify-center pt-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-8xl font-bold text-gradient mb-6"
            >
              404
            </motion.div>

            <h1 className="heading-lg mb-4">
              Ops, essa página não existe
            </h1>

            <p className="text-xl text-[var(--text-secondary)] mb-10">
              Parece que você se perdeu no espaço-tempo da IA.
              Mas calma, a gente te ajuda a voltar pro caminho certo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="btn-primary"
              >
                <Icon name="rocket" className="w-5 h-5" />
                <span>Voltar pro início</span>
              </Link>
              <Link
                to="/trilha"
                className="btn-secondary"
              >
                <Icon name="brain" className="w-5 h-5" />
                <span>Explorar a Trilha</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
