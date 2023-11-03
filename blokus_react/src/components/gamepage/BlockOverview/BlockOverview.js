import '../../../styles/Gamepage/BlockOverview/blockoverview.css'
import BlockFilter from './BlockFilter';
import BlockSelector from './BlockSelector';

export default function BlockOverview(){
    return (
        <div class="block-overview">
            <BlockSelector/>
            <BlockFilter />
        </div>
    );
}