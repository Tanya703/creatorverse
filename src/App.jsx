import { useRoutes } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'

export default function App() {
  const element = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/creators/:id', element: <ViewCreator /> },
    { path: '/new', element: <AddCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
  ])

  return element
}
