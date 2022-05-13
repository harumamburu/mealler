import Card from '../ui/card/Card';
import styles from './Pages.module.css';

const UnauthorizedPage = () => {
  return (
    <main>
      <Card className={styles.page}>
        <div className={styles.http}>
          <h2>Nice try Bud.</h2>
          <img src="https://http.cat/401.jpg" alt="Unauthorized" />
        </div>
      </Card>
    </main>
  );
};

export default UnauthorizedPage;
