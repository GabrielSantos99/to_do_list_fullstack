import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return(
        <div className="">
            <header className="fixed w-full top-0 left-0 bg-slate-100 shadow">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <p className="text-gray-950 text-xl font-semibold px-2">To-Do List</p>
                    <nav className="px-2 justify-between">
                        <button
                            onClick={() => {navigate("/login")}}
                            className="m-2 bg-transparent text-gray-950 border-none"
                        >Entrar</button>
                        <button
                            onClick={() => {navigate("/register")}}
                            className="my-2 bg-blue-700 hover:bg-blue-800"
                        >Registrar</button>
                    </nav>
                </div>
            </header>
            <main>
                <h1 className="font-bold text-center py-1">Organize suas tarefas com facilidade. Faça login ou crie uma conta para começar.</h1>
                <p className="text-center py-3">Não perca tempo e faça seu cadastros, venha para o time se sejá mais produtivo!</p>
                <button
                    onClick={() => {navigate("/register")}}
                    className="my-2 bg-blue-700 hover:bg-blue-800"
                >Faça parte do time</button>
            </main>
            <footer className="fixed w-full bottom-0 left-0 p-2">
                <a href="https://github.com/GabrielSantos99">Git Hub</a>
            </footer>
        </div>
    );
}

export default Home;
