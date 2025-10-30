import React from "react";
import {FiHeart} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Made with <FiHeart className="heart-icon" /> by Inventory Team
        </p>
        <p className="footer-copyright">
          © {new Date().getFullYear()} Inventory Management System. All rights
          reserved.
        </p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <span>•</span>
          <a href="#terms">Terms of Service</a>
          <span>•</span>
          <a href="#contact">Contact</a>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: white;
          border-top: 1px solid #e5e7eb;
          padding: 2rem 1rem;
          margin-top: auto;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          color: #6b7280;
        }
        .footer-content p {
          margin: 0.5rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .heart-icon {
          color: #ef4444;
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .footer-copyright {
          font-size: 0.875rem;
        }
        .footer-links {
          margin-top: 1rem;
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .footer-links a {
          color: #667eea;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: #764ba2;
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          .footer {
            padding: 1.5rem 1rem;
          }
          .footer-content p {
            flex-direction: column;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
