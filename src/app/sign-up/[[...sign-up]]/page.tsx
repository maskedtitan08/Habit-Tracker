import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
    const defaultColor = "#d90429"
    const gradientColor = `linear-gradient(to bottom , ${defaultColor},#ff0440)`;

    return (
        <div className="flex justify-center items-center flex-col gap-10 w-full h-screen"
        style = {{background:gradientColor}}>
            <SignUp/>
        </div>
    )
}

export default SignUpPage;