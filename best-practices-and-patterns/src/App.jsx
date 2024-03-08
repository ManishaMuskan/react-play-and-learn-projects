import Accordion from './components/Accordion';
import AccordionTitle from './components/AccordionTitle';
import SearchableList from './components/SearchableList';
//import AccordionItem from "./components/AccordionItem";
import savannaImg from './assets/african-savanna.jpg';
import amazonImg from './assets/amazon-river.jpg';
import caribbeanImg from './assets/caribbean-beach.jpg';
import desertImg from './assets/desert-dunes.jpg';
import forestImg from './assets/forest-waterfall.jpg';
import Place from './components/Place';

const PLACES = [
	{
		id: 'african-savanna',
		image: savannaImg,
		title: 'African Savanna',
		description: 'Experience the beauty of nature.',
	},
	{
		id: 'amazon-river',
		image: amazonImg,
		title: 'Amazon River',
		description: 'Get to know the largest river in the world.',
	},
	{
		id: 'caribbean-beach',
		image: caribbeanImg,
		title: 'Caribbean Beach',
		description: 'Enjoy the sun and the beach.',
	},
	{
		id: 'desert-dunes',
		image: desertImg,
		title: 'Desert Dunes',
		description: 'Discover the desert life.',
	},
	{
		id: 'forest-waterfall',
		image: forestImg,
		title: 'Forest Waterfall',
		description: 'Listen to the sound of the water.',
	},
];

function App() {
	return (
		<main>
			<section>
				<Accordion className='accordion'>
					<Accordion.Item id='1' className='accordion-item'>
						<Accordion.Item.Title className='accordion-item-title'>
							Lorem ipsum dolor, sit amet consectetur
						</Accordion.Item.Title>
						<Accordion.Item.Content className='accordion-item-content'>
							<article>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit.
									Veritatis nostrum error tempora esse praesentium voluptatem ad
									ratione deserunt reiciendis autem aut sit in soluta dicta, ut
									laboriosam, et quod accusantium!
								</p>
							</article>
						</Accordion.Item.Content>
					</Accordion.Item>

					<Accordion.Item id='2' className='accordion-item'>
						<Accordion.Item.Title className='accordion-item-title'>
							Lorem ipsum dolor, sit amet consectetur
						</Accordion.Item.Title>
						<Accordion.Item.Content className='accordion-item-content'>
							<article>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit.
									Veritatis nostrum error tempora esse praesentium voluptatem ad
									ratione deserunt reiciendis autem aut sit in soluta dicta, ut
									laboriosam, et quod accusantium!
								</p>
							</article>
						</Accordion.Item.Content>
					</Accordion.Item>

					<Accordion.Item id='3' className='accordion-item'>
						<Accordion.Item.Title className='accordion-item-title'>
							Lorem ipsum dolor, sit amet consectetur
						</Accordion.Item.Title>
						<Accordion.Item.Content className='accordion-item-content'>
							<article>
								<p>
									Lorem ipsum dolor, sit amet consectetur adipisicing elit.
									Veritatis nostrum error tempora esse praesentium voluptatem ad
									ratione deserunt reiciendis autem aut sit in soluta dicta, ut
									laboriosam, et quod accusantium!
								</p>
							</article>
						</Accordion.Item.Content>
					</Accordion.Item>
				</Accordion>
			</section>
			<section>
				<SearchableList items={PLACES} itemKeyFn={(item) => item.id}>
					{(item) => <Place item={item} />}
				</SearchableList>
				<SearchableList items={['item 1', 'item 2']} itemKeyFn={(item) => item}>
					{(item) => item}
				</SearchableList>
			</section>
		</main>
	);
}

export default App;
