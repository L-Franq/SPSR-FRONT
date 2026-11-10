import DashboardHeader from "./components/Dashboards/user_header/DashboardHeader";
import DashboardMain from "./components/Dashboards/user_main/DashboardMain"
import DashboardFooter from "./components/Dashboards/user_footer/DashboardFooter";

export default function DashboardUser(){
    return(
        <>
        <DashboardHeader />
        <DashboardMain />
        <DashboardFooter />
        </>
    );
}