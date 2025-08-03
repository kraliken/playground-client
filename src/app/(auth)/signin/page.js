import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CredentialsSignInForm from "./credentials-singin-form";

const SignIn = () => {

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card>
        <CardHeader className='space-y-4'>
          <CardTitle className='text-center'>Bejelentkezés</CardTitle>
          <CardDescription className='text-center'>
            Jelentkezz be a fiókodba
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );

}

export default SignIn
