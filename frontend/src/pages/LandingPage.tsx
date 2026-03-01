import { Link } from 'react-router-dom'
import { appName } from '../services/api'

export const LandingPage = () => {
  return (
    <main className="landing">
      <div className="animated-bg"></div>

      <header className="landing-header glass">
        <div className="landing-logo">
          {appName} <span className="badge-free">100% Gratuito</span>
        </div>

        <div className="landing-actions">
          <Link to="/login" className="btn btn-outline-secondary">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Criar Conta
          </Link>
        </div>
      </header>

      <section className="landing-hero">
        <h1>Transforme sua Mesa de Poker em um Sistema Profissional</h1>
        <p>
          Chega de anotações confusas, cálculos manuais e discussões sobre saldo.
          O Poker Cash automatiza o controle de buy-ins, lucros e ranking em tempo real.
        </p>
        <Link to="/register" className="btn btn-primary btn-lg">
          Criar Conta Gratuitamente
        </Link>
      </section>

      <section className="stats">
        <div>
          <h2>+2.500</h2>
          <p>Partidas Registradas</p>
        </div>
        <div>
          <h2>+1.200</h2>
          <p>Usuários Ativos</p>
        </div>
        <div>
          <h2>99%</h2>
          <p>Precisão nos Cálculos</p>
        </div>
      </section>

      <section className="problem">
        <h2>O Problema</h2>
        <p>
          Em mesas caseiras, o controle financeiro vira confusão. Quem pagou? 
          Quem está devendo? Quem ganhou mais no mês?
        </p>
      </section>

      <section className="solution">
        <h2>A Solução</h2>
        <div className="solution-grid">
          <div>
            <h4>Controle Automático</h4>
            <p>O sistema calcula tudo para você, instantaneamente.</p>
          </div>
          <div>
            <h4>Ranking Inteligente</h4>
            <p>Acompanhe os maiores vencedores da mesa.</p>
          </div>
          <div>
            <h4>Histórico Completo</h4>
            <p>Relatórios organizados para analisar desempenho.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>O que estão dizendo</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"Finalmente paramos de discutir saldo na mesa."</p>
            <span>— Carlos M.</span>
          </div>
          <div className="testimonial-card">
            <p>"Parece um sistema profissional de cassino."</p>
            <span>— Eduardo S.</span>
          </div>
          <div className="testimonial-card">
            <p>"Mudou completamente nossa organização."</p>
            <span>— Rafael T.</span>
          </div>
        </div>
      </section>

      <section className="faq">
        <h2>Perguntas Frequentes</h2>
        <div className="faq-item">
          <h4>É realmente gratuito?</h4>
          <p>Sim. O sistema é 100% gratuito para uso pessoal.</p>
        </div>
        <div className="faq-item">
          <h4>Posso usar no celular?</h4>
          <p>Sim, o sistema é totalmente responsivo.</p>
        </div>
      </section>

      <section className="landing-cta">
        <h2>Pronto para organizar sua mesa?</h2>
        <Link to="/register" className="btn btn-primary btn-lg">
          Começar Agora
        </Link>
      </section>

      <footer className="landing-footer">
        © 2026 {appName}. Sistema de Gestão para Mesas de Poker.
      </footer>
    </main>
  )
}