import { Suspense, lazy } from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const MyLibraryPage = lazy(() =>
    import("../pages/MyLibraryPage/MyLibraryPage")
);
const RecommendationPage = lazy(() => import("../pages/RecommendationPage/RecommendationPage"));
function App() {
  return (
      <>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/library" element={<MyLibraryPage />} />
              <Route path="/recommendation" element={<RecommendationPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </>
  );
}

export default App;
