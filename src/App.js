import React, { Suspense, lazy } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';


const Home = lazy(() => import('./pages/Home'))
const History = lazy(() => import('./pages/History'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Spin size="large" tip='加载中' />}>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/history' component={History} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
