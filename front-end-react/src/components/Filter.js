import { useParams } from "react-router-dom";

const Filter = (props) => {
    const {
        material = 'sve',
        category = 'sve',
        min = 0,
        max = 0,
        rating = 0,
        order = 'toprated',
    } = useParams()
    
    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category
        const filterMaterial = filter.material || material
        const filterRating = filter.rating || rating
        const sortOrder = filter.order || order
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max
        return `/search/category/${filterCategory}/material/${filterMaterial}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`
    }
    return (
        <div className="filter">
            <form>
            <div>
                Izaberi kategoriju {' '}
                <select
                value={category}
                onChange={(e) => {
                    props.history.push(getFilterUrl({ category: e.target.value }));
                }}
                >
                <option value="muski">Muski</option>
                <option value="zenski">Zenski</option>
                <option value="sve">Svi</option>
                </select>
            </div>
            <div>
                Izaberi materijal {' '}
                <select
                value={material}
                onChange={(e) => {
                    props.history.push(getFilterUrl({ material: e.target.value }));
                }}
                >
                <option value="oystersteel">Oystersteel</option>
                <option value="gold">Zlato</option>
                <option value="sve">Svi</option>
                </select>
            </div>
            <div>
                Sortiraj {' '}
                <select
                value={order}
                onChange={(e) => {
                    props.history.push(getFilterUrl({ order: e.target.value }));
                }}
                >
                <option value="lowest">Cena: rastuce</option>
                <option value="highest">Cena: opadajuce</option>
                <option value="toprated">Prosecna ocena</option>
                </select>
            </div>
            <div>
                <button type="submit" className="small">Primenite filter</button>
            </div>
            </form>
        </div>
    );
}
 
export default Filter;