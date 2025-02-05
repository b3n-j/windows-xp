import UserSelection from '@/app/_components/widgets/login/user-selection';
import Header from '@/app/_components/widgets/login/header';
import Footer from '../_components/widgets/login/footer';

export default function LoginPage() {
  return (
    <div className="login-screen w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <Header />
      <UserSelection />
      <Footer />
    </div>
  );
} 