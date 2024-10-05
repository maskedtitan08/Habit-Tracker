const HeroSection = () => {
    return(
        <div className="flex flex-col mx-16 items-center mt-[100px] gap-16 ">
            <span className="font-bold text-3xl text-center">
                <span className="text-customRed">Healthy habits</span> gives you a healthy life.
            </span>
            <p className="text-center text-sm sm:w-[430px] w-[370px] ">
                A healthy lifestyle is a long-term commitment that requires patience, persistence, and self-discipline.
                Use this easy-to-use habit tracker to take control of your day and achieve your goals.
            </p>
            <button className="block sm:w-48 w-full border rounded-lg px-9 py-3 text-sm font-medium focus:outline-none border-customRed bg-customRed text-white" type="button">
                Let's get started!
            </button>
        </div>
    )
}

export default HeroSection