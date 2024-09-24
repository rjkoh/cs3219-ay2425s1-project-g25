import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "presentation/components/Layout";
import QuestionsPage from "presentation/pages/QuestionsPage";

const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/questions" />} />

			<Route
				path="/questions"
				element={
					<Layout>
						<QuestionsPage />
					</Layout>
				}
			/>
		</Routes>
	);
};

export default AppRoutes;