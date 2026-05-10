import styles from './Home.module.css';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/backend/constants/products';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Premium 3D Hero Section */}
      <section className={`${styles.hero} perspective-1000`}>
        <div className={styles.orbA} />
        <div className={styles.orbB} />
        <div className={`${styles.heroContent} lift-3d glass-panel transform-style-3d`} style={{ padding: '3rem', borderRadius: '1rem', marginTop: '2rem' }}>
          <h1 className={`${styles.heroTitle} text-3d`} style={{ marginBottom: '1.5rem' }}>Handmade with Love, <br /><span>Woven with Power.</span></h1>
          <p className={styles.heroSubtitle} style={{ color: '#2c2c2c', fontWeight: 500 }}>Enterprise-grade storefront experience for premium handcrafted products.</p>
          <button className={`${styles.ctaButton} press-3d`}>Shop the Collection</button>
        </div>
      </section>

      {/* Product Grid */}
      <section className={styles.productsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Collection</h2>
          <div className={styles.categoryFilters}>
            <button className={styles.activeFilter}>All Items</button>
            <button className={styles.filter}>Clothing</button>
            <button className={styles.filter}>Accessories</button>
            <button className={styles.filter}>Home Decor</button>
          </div>
        </div>

        <div className={styles.grid}>
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              image={product.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
