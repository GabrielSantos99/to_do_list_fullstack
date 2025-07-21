import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TaskList from "./components/TaskList";
import PrivateRoute from "./components/PrivateRoute";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/register" element={<RegisterForm />}/>
            <Route path="/tasks" element={
                <PrivateRoute>
                    <TaskList />
                </PrivateRoute>
                }/>
        </Routes>
    );
}

export default MainRoutes;
