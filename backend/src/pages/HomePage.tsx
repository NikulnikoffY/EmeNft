import React from 'react';
import { Link } from 'react-router-dom';
import { FaCoins, FaStore, FaShieldAlt, FaRocket, FaTag } from 'react-icons/fa';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: <FaCoins className="h-12 w-12 text-primary-500" />,
      title: 'TON Blockchain',
      description: 'Built on TON blockchain for fast and low-cost transactions'
    },
    {
      icon: <FaStore className="h-12 w-12 text-primary-500" />,
      title: 'GetGems Integration',
      description: 'Seamlessly list your NFTs on GetGems marketplace'
    },
    {
      icon: <FaShieldAlt className="h-12 w-12 text-primary-500" />,
      title: 'Secure',
      description: 'Your NFTs are secured by TON\'s robust blockchain technology'
    }
  ];

  const stats = [
    { number: '42', label: 'Collections' },
    { number: '1,250', label: 'NFTs Minted' },
    { number: '89', label: 'Sales' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Create & Trade NFTs on TON
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Mint your own NFT collection and list them on GetGems marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/mint">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                <FaRocket className="mr-2" />
                Start Minting
              </Button>
            </Link>
            <Link to="/list">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                <FaTag className="mr-2" />
                List NFT
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create and trade NFTs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Stats
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join the TON NFT ecosystem and start creating today
          </p>
          <Link to="/mint">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              <FaRocket className="mr-2" />
              Create Your First NFT
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
