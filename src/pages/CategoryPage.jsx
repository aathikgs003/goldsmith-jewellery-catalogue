import { useParams } from 'react-router-dom'
import CollectionBrowser from '../components/CollectionBrowser'

export default function CategoryPage() {
  const { slug } = useParams()
  return <CollectionBrowser initialCategorySlug={slug || 'bangles'} key={slug} />
}
