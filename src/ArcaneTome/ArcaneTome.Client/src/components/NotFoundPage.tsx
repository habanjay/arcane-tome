type NotFoundPageProps = { onHome: () => void };

function NotFoundPage({ onHome }: NotFoundPageProps) {
  return <main className="error-page"><div className="error-sigil">?</div><p className="eyebrow">ARCANE TOME <span>•</span> LOST PAGE</p><h1>404</h1><h2>This page slipped between the pages.</h2><p>We could not find the passage you were looking for. The reference is <strong>AT-404-25</strong>.</p><button className="save" type="button" onClick={onHome}>RETURN TO YOUR TOME ↗</button></main>;
}

export default NotFoundPage;
