import Card from '../ui/card/Card';
import styles from './Pages.module.css';

const NotFoundPage = () => {
  return (
    <Card className={styles.page}>
      <div className={styles.http}>
        <h2>Sorry, couldn&apos;t find anything...</h2>
        <img src="https://http.cat/404.jpg" alt="Not Found" />
      </div>
    </Card>
  );
};

export default NotFoundPage;
