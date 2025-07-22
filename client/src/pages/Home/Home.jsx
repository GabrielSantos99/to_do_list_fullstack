import { Link } from "react-router-dom";

function Home() {
    return(
        <div className="">
            <header className="fixed w-full top-0 left-0 bg-slate-100 shadow p-5">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <p className="text-gray-950 text-xl font-semibold px-2">To-Do List</p>
                    <nav className="px-2 justify-between">
                        <Link
                            to="/login"
                            className="m-2 bg-transparent text-gray-950 border-none p-3 rounded"
                        >Entrar</Link>
                        <Link
                            to="/register"
                            className="my-2 bg-blue-700 hover:bg-blue-800 text-white p-3 rounded"
                        >Registrar</Link>
                    </nav>
                </div>
            </header>
            <main>
                <h1 className="font-bold text-center py-1 text-gray-950">
                    Organize suas tarefas com facilidade. Faça login ou crie uma conta para começar.
                </h1>
                <p className="text-center py-3 text-gray-950 mb-8">
                    Não perca tempo e faça seu cadastros, venha para o time se sejá mais produtivo!
                </p>
                <Link
                    to="/register"
                    className="my-2 bg-blue-700 hover:bg-blue-800 text-white p-3 rounded"
                >Faça parte do time</Link>
            </main>
            <footer className="fixed w-full bottom-0 left-0 p-2">
                <a href="https://github.com/GabrielSantos99">Git Hub</a>
            </footer>
        </div>
    );
}

export default Home;
