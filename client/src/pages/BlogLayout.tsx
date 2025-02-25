import '../assets/blogLayout.css';

const BlogLayout = () => {
  return (
    <div className="layout-container">
      {/* Header */}
      <header className="header">
        Quirky Blog
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="blog-post-wrapper">
          {/* Post Title */}
          <h1 className="post-title">Welcome to the Quirky Blog!</h1>

          {/* Post Content */}
          <section className="post-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricies tempor justo, sit amet auctor
              mauris viverra eu. Nullam convallis maximus justo, nec convallis ante dictum et.
            </p>
            <p>
              Sed dignissim velit eget metus lacinia, a gravida felis facilisis. Integer gravida arcu libero, et
              consectetur arcu mollis nec. Integer vel risus nec leo lobortis tincidunt vel ut neque.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Quirky Blog
      </footer>
    </div>
  );
};

export default BlogLayout;

