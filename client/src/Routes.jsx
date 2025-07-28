import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TaskList from "./pages/TaskList/TaskList";
import PrivateRoute from "./components/PrivateRoute";
import TaskForm from "./components/TaskForm";

function MainRoutes() {
    const location = useLocation();
    const backgroundLocation = location.state?.backgroundLocation;

    return (
        <>
            <Routes location={ backgroundLocation || location }>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/tasks" element={
                    <TaskList />
                } />
                <Route path="/tasks/new" element={<TaskForm />} />
            </Routes >

            {backgroundLocation && (
                <Routes>
                    <Route
                        path="/tasks/new"
                        element={
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                                    <TaskForm />
                                </div>
                            </div>
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default MainRoutes;
