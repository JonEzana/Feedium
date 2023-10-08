from app.models import db, Story, User, Topic, Comment, Snap, environment, SCHEMA
import random
from sqlalchemy.sql import text

def seed_users():
   demo = User(
      username='demo', first_name='Demo', last_name='Lition', email='demo@aa.io', password='password', profile_pic='https://pyxis.nymag.com/v1/imgs/29b/bae/50c47f603f465c28cc385853c6a36169c1-29-steve-brule-check-it-out.rsquare.w700.jpg')
   marnie = User(
      username='marnie', first_name='Marnie', last_name='Johnson', email='marnie@aa.io', password='password', profile_pic='https://img.buzzfeed.com/buzzfeed-static/static/2016-10/28/9/asset/buzzfeed-prod-fastlane01/sub-buzz-6490-1477663180-5.jpg')
   bobbie = User(
      username='bobbie', first_name='Bobbie', last_name='Doe', email='bobbie@aa.io', password='password', profile_pic='https://static.onecms.io/wp-content/uploads/sites/6/2004/08/14493__rj_l.jpg')
   jon = User(
      username='jon', first_name='Jon', last_name='Ezana', email='jon@aa.io', password='password', profile_pic='https://static.wikia.nocookie.net/boondockstv/images/a/af/Hueyfreeman-jpg.png/')

   all_users = [demo, marnie, bobbie, jon]

   Story1 = Story(
      user=random.choice(all_users), title="A Culinary Gem in D.C.: Jyoti Indian Cuisine", story_text="I recently dined at Jyoti Indian Cuisine in Washington, D.C., and it was an unforgettable experience that exceeded all expectations. From the moment I entered, I was transported to the vibrant streets of India.\nThe restaurant's decor blends traditional Indian elements with modern sophistication, creating an inviting space for intimate dinners and lively gatherings. The lighting sets the perfect mood.\nNow, let's talk about the food. Jyoti Indian Cuisine offers an extensive menu that showcases the rich tapestry of Indian flavors. The diversity of Indian cuisine is well represented, catering to all tastes.\nFor starters, I had the samosas and crispy pakoras. The samosas were perfectly crisp with a flavorful filling, and the pakoras were delightful, served with tantalizing chutneys.\nFor the main course, I tried the butter chicken, a classic North Indian dish. The tender chicken pieces were bathed in a rich, creamy tomato sauce that was heavenly. Paired with freshly baked naan, it was a match made in culinary paradise.\nThe service deserves special mention. The staff was attentive, knowledgeable, and offered great recommendations for a personalized experience.\nThe dessert selection was the perfect finale. I indulged in a slice of their mango cheesecake, a delightful fusion of Indian and Western flavors.\nIn conclusion, Jyoti Indian Cuisine in D.C. is a culinary gem that should not be missed. It offers an authentic taste of India in the heart of the city, making it a must-visit for both locals and tourists. Whether you're a seasoned lover of Indian cuisine or trying it for the first time, Jyoti Indian Cuisine will leave you with a lasting impression and a craving for more. I can't wait to return and explore more of their exquisite offerings.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/jyotione.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/jyotitwo.jpeg", image_url_3="https://feedium-bucket.s3.amazonaws.com/jyotithree.jpeg", image_url_4="https://feedium-bucket.s3.amazonaws.com/jyotifour.jpeg"
   )
   Story2 = Story(
      user=random.choice(all_users), title="Embracing Culinary Fusion: Celebrating Diversity in the Kitchen", story_text="The world is a melting pot of cultures, each with its own unique traditions, customs, and cuisines. One of the most exciting and delicious ways to celebrate this diversity is by combining ethnic cuisines in the kitchen. Yet, some may feel apprehensive about mixing flavors and techniques from different culinary traditions. In this essay, we will explore why you should not be afraid to combine ethnic cuisines and how this practice can open up a world of culinary creativity, innovation, and appreciation.\nCulinary Diversity Reflects Our Global Society\nOur modern world is interconnected like never before. Migration, globalization, and the ease of travel have brought people from different corners of the globe together. As a result, our societies are becoming increasingly multicultural. Embracing this diversity in the kitchen is a way to pay homage to the vibrant tapestry of cultures that enrich our lives. It allows us to explore the depth and breadth of culinary traditions that may have once seemed distant or foreign.\nA Journey of Discovery\nCombining ethnic cuisines provides a unique opportunity for culinary exploration. It allows you to step out of your comfort zone and embark on a journey of discovery. You can experiment with ingredients, techniques, and flavors that you may have never encountered before. This not only broadens your culinary horizons but also deepens your understanding of different cultures and their culinary heritage.\nCreativity Knows No Bounds\nIn the kitchen, creativity knows no bounds. Combining elements from different cuisines allows you to create exciting and innovative dishes that transcend traditional boundaries. It encourages you to think outside the box and challenge conventional notions of what a meal should be. When you blend flavors and techniques from various cultures, you are not only creating delicious food but also contributing to the evolution of global cuisine.\nBreaking Down Stereotypes\nFood has a remarkable ability to break down stereotypes and foster cultural understanding. When you combine ethnic cuisines in your kitchen, you are not only enjoying a meal but also engaging in a form of cultural exchange. It sends a powerful message that you appreciate and respect the diverse backgrounds of the people who inspire your cooking. This can promote dialogue and dispel misconceptions, contributing to a more harmonious and inclusive society.\nFusion Cuisine: A Culinary Revolution\nFusion cuisine is a testament to the beauty of combining ethnic flavors. It has given birth to some of the most beloved and iconic dishes in the culinary world. Think of sushi burritos, Tex-Mex cuisine, or Thai-inspired pizza. These creations showcase how blending different culinary traditions can result in culinary masterpieces that captivate the taste buds and challenge preconceived notions about food.\nCultural Adaptation\nCombining ethnic cuisines is not about cultural appropriation; rather, it's about cultural adaptation. It involves respecting and learning about the traditions you are incorporating into your cooking. It's about understanding the history and significance of the ingredients and techniques you use. When done with reverence and knowledge, combining cuisines becomes a way to honor and celebrate the diversity of our world.\nA Personal Culinary Journey\nCooking is a deeply personal experience. It allows you to express your identity and creativity through food. Combining ethnic cuisines in your kitchen becomes a part of your own culinary journey. It enables you to develop a unique style that reflects your tastes, experiences, and influences. Your kitchen becomes a canvas, and your dishes are the art that tells your story.\nConclusion\nIn a world where diversity is celebrated and cultural exchange is encouraged, there is no reason to be afraid of combining ethnic cuisines in the kitchen. This practice is a tribute to the rich tapestry of cultures that make our world vibrant and unique. It is an opportunity for culinary exploration, creativity, and cultural understanding. By embracing the fusion of flavors and techniques, we not only create delicious meals but also foster a more inclusive and harmonious society. So, let your taste buds be your guide, and don't be afraid to embark on a culinary journey that celebrates the beauty of diversity.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/culture.jpeg"
   )
   Story3 = Story(
      user=random.choice(all_users), title="Creamy Vegan Mac and Cheese Recipe", story_text="Ingredients:\n12 ounces (340g) elbow macaroni or your favorite pasta\n2 cups (480ml) unsweetened almond milk (or any plant-based milk)\n1 cup (240ml) vegetable broth\n1 cup (150g) raw cashews, soaked in hot water for 15 minutes\n1/4 cup (30g) nutritional yeast\n2 tablespoons olive oil\n2 tablespoons all-purpose flour\n2 cloves garlic, minced\n1 teaspoon onion powder\n1/2 teaspoon turmeric powder (for color)\n1/2 teaspoon paprika\nSalt and pepper to taste\n1 teaspoon lemon juice (optional, for tanginess)\n1/2 cup (30g) breadcrumbs (optional, for topping)\nFresh parsley, for garnish (optional)\nInstructions:\\Cook the Pasta:\nCook the macaroni or pasta according to the package instructions until al dente. Drain and set aside.\nPrepare the Cashew Cheese Sauce:\\Drain the soaked cashews and add them to a blender.\nPour in the almond milk and blend until smooth and creamy.\n\nMake a Roux:\n\nIn a saucepan, heat the olive oil over medium heat.\nAdd minced garlic and cook for 1-2 minutes until fragrant.\nStir in the flour and cook for another 1-2 minutes, stirring constantly to avoid lumps.\nGradually whisk in the vegetable broth, followed by the cashew cream mixture. Continue to whisk until the sauce thickens, which should take about 5-7 minutes.\nnSeason the Sauce:\nnStir in the nutritional yeast, onion powder, turmeric, paprika, salt, and pepper.\nAdd lemon juice for a slight tangy flavor (adjust to your preference).\n\nCombine Pasta and Sauce:\n\nPour the creamy sauce over the cooked pasta and stir to combine thoroughly.\nOptional Breadcrumb Topping:\n\nPreheat your oven to 350°F (175°C).\nTransfer the mac and cheese mixture to a baking dish.\nSprinkle breadcrumbs evenly over the top for a crispy crust.\n\nBake (Optional):\n\nPlace the baking dish in the preheated oven and bake for about 15-20 minutes or until the top is golden brown.\n\nServe:\n\nRemove from the oven and let it cool slightly.\nGarnish with fresh parsley if desired.\nServe your creamy vegan mac and cheese hot and enjoy!\nThis vegan mac and cheese recipe is a delicious and satisfying alternative to traditional mac and cheese. It's creamy, cheesy, and full of flavor without any animal products. Enjoy your cruelty-free comfort food!", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/macone.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/mactwo.jpeg"
   )
   Story4 = Story(
      user=random.choice(all_users), title="The Virtues of Veganism: A Compassionate and Sustainable Lifestyle", story_text="Veganism, a dietary and ethical choice that abstains from consuming animal products, has gained increasing attention in recent years. Beyond being a dietary preference, veganism embodies a set of virtues that encompass compassion, sustainability, and health. In this essay, we will explore the virtues of veganism, highlighting its impact on animal welfare, environmental sustainability, and personal health.\nCompassion towards Animals\nOne of the primary virtues of veganism is its profound compassion for animals. Vegans choose to forgo consuming meat, dairy, and other animal products in recognition of the suffering endured by animals in the food industry. Factory farming practices often involve overcrowded, unsanitary conditions, and the routine use of antibiotics and hormones, all of which contribute to the suffering of animals. By adopting a vegan lifestyle, individuals show empathy and compassion for sentient beings, striving to reduce the demand for such practices.\nEnvironmental Sustainability\nVeganism aligns closely with the virtue of environmental sustainability. The production of animal products consumes vast amounts of natural resources, contributes to deforestation, and generates substantial greenhouse gas emissions. Livestock farming is a leading cause of habitat destruction and water pollution. Veganism, by contrast, requires fewer resources and has a significantly lower environmental footprint. By adopting a plant-based diet, individuals reduce their carbon footprint and help preserve our planet for future generations.\nEthical Consumption\nVeganism encourages ethical consumption by advocating for cruelty-free alternatives. Vegan products, including plant-based foods, cosmetics, and clothing, are often produced without the use of animal testing or exploitation. This ethical dimension extends beyond diet and encompasses various aspects of daily life, fostering conscious choices that align with the principles of compassion and respect for all living beings.\nHealth Benefits\nThe virtue of health is another compelling argument for veganism. Numerous scientific studies have shown that a well-balanced vegan diet can be incredibly beneficial for human health. A diet rich in fruits, vegetables, grains, nuts, and legumes can lower the risk of chronic diseases, such as heart disease, diabetes, and certain cancers. Veganism promotes a healthier lifestyle by encouraging individuals to make mindful dietary choices and prioritize whole, plant-based foods.\nGlobal Food Security\nVeganism contributes to the virtue of global food security. As the global population continues to grow, the demand for food will increase significantly. Animal agriculture is an inefficient way to produce food since it requires large amounts of land, water, and crops to feed livestock. By transitioning to plant-based diets, we can redirect valuable resources towards producing more food to feed a growing world population, addressing global hunger and ensuring food equity.\nPersonal Growth and Empowerment\nVeganism can be a journey of personal growth and empowerment. It challenges individuals to become more conscious consumers, to learn about the origins of their food, and to make informed choices that align with their values. This process of self-discovery and empowerment extends beyond diet and often leads to a greater awareness of other social and environmental issues, inspiring individuals to take action and make positive changes in their lives.\nConclusion\nIn conclusion, veganism embodies a range of virtues that extend far beyond dietary choices. It is a lifestyle rooted in compassion, sustainability, and personal health. By choosing veganism, individuals show empathy towards animals, reduce their environmental impact, make ethical consumption choices, improve their health, contribute to global food security, and embark on a journey of personal growth and empowerment. As awareness of these virtues continues to grow, veganism stands as a compelling and virtuous way of life that promotes a more compassionate, sustainable, and harmonious world for all.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/vegan.jpg", image_url_2="https://feedium-bucket.s3.amazonaws.com/veeegan.jpeg"
   )
   Story5 = Story(
      user=random.choice(all_users), title="Vegetarianism", story_text="Vegetarianism, the practice of abstaining from consuming meat and its derivatives, has gained significant popularity in recent years for a multitude of reasons. It is not merely a dietary choice but a lifestyle that embodies a set of virtues that extend beyond personal health to encompass environmental sustainability, ethical considerations, and social responsibility. In this essay, we will explore the virtues of vegetarianism, highlighting its positive impact on health, the environment, animal welfare, and societal harmony.\nOne of the foremost virtues of vegetarianism lies in its potential to promote better health. Numerous studies have demonstrated that a well-balanced vegetarian diet can significantly reduce the risk of various chronic diseases, including heart disease, hypertension, type 2 diabetes, and certain types of cancer. Vegetarians tend to have lower cholesterol levels and blood pressure, lower rates of obesity, and a longer life expectancy compared to their meat-eating counterparts. By opting for plant-based foods, individuals can lower their intake of saturated fats and cholesterol while increasing their consumption of vital nutrients such as fiber, vitamins, and antioxidants. Thus, vegetarianism serves as a pathway to a healthier, longer life.\nVegetarianism is also virtuous in its contribution to environmental sustainability. The meat industry is a leading cause of deforestation, habitat destruction, and greenhouse gas emissions, making it a significant driver of climate change. Livestock farming requires vast amounts of land, water, and food resources to sustain, which could otherwise be used to address global food security challenges. Choosing a vegetarian diet reduces one's carbon footprint and eases the strain on our planet's resources. By embracing plant-based diets, individuals can play an active role in mitigating environmental degradation and promoting sustainable living.\nPerhaps one of the most compelling virtues of vegetarianism is its commitment to animal welfare. The modern industrialized meat production system often subjects animals to inhumane conditions, including overcrowded spaces, routine use of antibiotics, and stressful lives devoid of natural behaviors. Vegetarianism offers a compassionate alternative by advocating for the rights and well-being of animals. By refusing to participate in the consumption of animal products, individuals send a powerful message that they stand against the cruelty inherent in factory farming. This stance promotes ethical treatment of animals and encourages the adoption of more humane farming practices.\nVegetarianism also carries a virtue of social responsibility. In a world where food scarcity is a pressing issue, the inefficiency of meat production exacerbates the problem. It takes significantly more resources to produce a kilogram of meat than a kilogram of plant-based foods. By adopting a vegetarian lifestyle, individuals free up resources that could be redirected toward feeding the hungry and addressing global food inequities. Vegetarianism fosters a sense of responsibility towards the welfare of others and encourages sustainable food production practices that can help alleviate world hunger.\nIn conclusion, vegetarianism is a virtuous choice that encompasses numerous benefits for individuals and society as a whole. Its positive impact on health, the environment, animal welfare, and social responsibility makes it a compelling lifestyle choice. As individuals become increasingly aware of the virtues of vegetarianism, it is likely to continue gaining popularity as a means to promote personal well-being and contribute to a more ethical and sustainable world. Ultimately, the choice to embrace vegetarianism is not just about what one eats but about the values and virtues one upholds in their daily life.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/vegggg.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/veggie.jpeg"
   )
   Story6 = Story(
      user=random.choice(all_users), title="The Benefits of a Carnivorous Diet: Unveiling the Controversial Path to Optimal Health", story_text="The carnivorous diet, characterized by the exclusive or predominant consumption of animal-based foods, has gained attention for its potential health benefits. This essay explores these benefits and associated controversies.\n\nHumans possess physiological adaptations supporting the consumption of animal-based foods, suggesting a genetic predisposition. Animal foods are rich in essential nutrients, reducing the risk of deficiencies.\n\nA carnivorous diet's high protein and low-carb nature may reduce appetite, increase fat oxidation, and aid in weight loss and improved body composition. The diet's absence of high-glycemic carbs may benefit blood sugar regulation. Nutritional ketosis induced by the diet is thought to enhance cognitive function and mental clarity, with anti-inflammatory properties potentially protecting the brain. For therapeutic applications, eliminating potential dietary triggers on a carnivorous diet can alleviate autoimmune symptoms and provide relief for gastrointestinal disorders.\n\nHowever, concerns exist regarding potential deficiencies in fiber, vitamins (e.g., vitamin C), and phytonutrients found in plant-based foods.\n\nEthical and environmental issues surround the exclusive consumption of animal-based foods, including animal welfare and sustainability. Additionally, the long-term health effects of a carnivorous diet remain uncertain, with concerns about heart health, kidney function, and overall mortality. Therefore, while the carnivorous diet offers potential health benefits, it should be approached with caution, considering the associated risks and uncertainties. Consultation with healthcare professionals and careful consideration of personal health goals and values are crucial before adopting this dietary pattern. Ongoing research and debate in the field of nutrition continue to shape our understanding of the carnivorous diet's merits and drawbacks.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/carn.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/carni.png"
   )

   Story7 = Story(
      user=random.choice(all_users), title="DAIKAYA: Best ramen shop in Chinatown", story_text="DAIKAYA in D.C. is a culinary gem that truly stands out in the city's vibrant dining scene. With its inviting atmosphere and exceptional Japanese cuisine, it offers an unforgettable dining experience. The menu is a delightful blend of traditional and modern dishes, showcasing the mastery of flavors and textures that Japanese cuisine is known for. Whether you opt for the rich and savory ramen bowls that are a specialty here or explore their array of sushi and sashimi options, each bite is a symphony of taste. The attentive and knowledgeable staff enhance the dining experience, guiding you through the menu and ensuring that every aspect of your visit is enjoyable. DAIKAYA is a must-visit destination for food enthusiasts and anyone looking to savor the essence of Japan right in the heart of D.C.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/daithree.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/daitwo.jpeg"
   )

   Story8 = Story(
      user=random.choice(all_users), title="Shakshouka: Ultimate Breakfast Delight", story_text="Shakshouka, a savory and aromatic dish originating from North Africa and embraced worldwide, undeniably deserves its reputation as the ultimate breakfast choice. This culinary masterpiece combines simplicity with bold flavors, making it a morning delight like no other. The foundation of shakshouka lies in its rich tomato and pepper sauce, a harmonious blend of sweet and tangy notes that dance on the palate. Eggs, delicately poached in this luscious concoction, add a creamy, protein-packed punch, elevating its nutritional value and keeping hunger at bay until lunch. Moreover, the versatility of shakshouka knows no bounds – it can be personalized with a myriad of toppings, from crumbled feta to fresh herbs, allowing each breakfast enthusiast to tailor it to their taste. With its ease of preparation and heartwarming aroma, shakshouka transcends mere sustenance; it offers a morning ritual that tantalizes the senses and brings people together over a shared love for the most splendid breakfast experience imaginable.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/shaone.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/shatwo.jpeg", image_url_3="https://feedium-bucket.s3.amazonaws.com/shathree.jpeg", image_url_4="https://feedium-bucket.s3.amazonaws.com/shafour.jpeg"
   )

   Story9 = Story(
      user=random.choice(all_users), title="Top 5 Margherita Pizzas DC", story_text="Ranking the top 5 Margherita pizzas in the vibrant culinary landscape of Washington, D.C. is no easy task, as the nation's capital has become a hotspot for diverse and delectable cuisine. However, after careful consideration and numerous delicious tastings, the following pizzerias have consistently stood out. Topping our list is the iconic 2 Amys, where their wood-fired Margherita pie showcases the perfect balance of chewy, blistered crust, tangy San Marzano tomato sauce, fresh mozzarella, and fragrant basil leaves. Close behind is Pupatella, known for their Neapolitan-style pizza, featuring a soft and pillowy crust adorned with top-tier ingredients. Meanwhile, Vace Italian Delicatessen, a local institution, offers a wallet-friendly yet incredibly tasty Margherita pizza. We also can't ignore the artisanal mastery of Timber Pizza Co., where their Margherita is a symphony of flavors, thanks to locally sourced ingredients and a dedication to craft. Finally, we have to acknowledge the exceptional Margherita pizza at Menomale, where their brick-oven pies boast a thin, crisp crust topped with tomatoes, mozzarella, and basil that will transport your taste buds to Naples. While D.C. boasts a multitude of fantastic pizza joints, these five Margherita pizzas have consistently elevated the classic dish to an art form in the heart of the nation's capital.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/mar.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/marg.jpeg", image_url_3="https://feedium-bucket.s3.amazonaws.com/margiee.jpeg", image_url_4="https://feedium-bucket.s3.amazonaws.com/margieee.jpeg"
   )

   Story10 = Story(
      user=random.choice(all_users), title="Exceptional Korean BBQ Experience", story_text="Honey Pig Korean BBQ is a culinary gem that stands out in the world of Korean barbecue restaurants. From the moment you walk in, the warm and inviting ambiance sets the stage for an exceptional dining experience. The centerpiece of this establishment is the built-in tabletop grills, where you take charge of grilling your selection of marinated meats and vegetables, ensuring a hands-on and interactive meal. The menu boasts an extensive array of options, from classic beef bulgogi and thinly sliced pork belly to more adventurous cuts like beef tongue and intestine, catering to both traditionalists and adventurous eaters alike. The quality of the meat is superb, impeccably seasoned and fresh, making each bite a tantalizing burst of flavor. The banchan (side dishes) are a delightful accompaniment, offering a variety of pickled vegetables and kimchi to complement the grilled meats. The attentive and knowledgeable staff guide you through the process, ensuring your meal is a success. While the prices may be on the higher side, the quantity and quality of food justify the cost. The experience at Honey Pig is not just about the food but also the communal aspect of sharing a meal and creating lasting memories with friends and family. Whether you're a barbecue aficionado or a first-timer, Honey Pig Korean BBQ is a must-visit, offering a delightful journey into the world of Korean cuisine that leaves you craving more.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/hpone.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/hptwo.jpeg", image_url_3="https://feedium-bucket.s3.amazonaws.com/hpthree.jpeg", image_url_4="https://feedium-bucket.s3.amazonaws.com/hpjfour.png"
   )

   Story11 = Story(
      user=random.choice(all_users), title="Habesha: A Taste of Ethiopia in Washington, D.C.", story_text="In the heart of Washington, D.C., lies a culinary gem named Habesha that transports diners to the vibrant and flavorful world of Ethiopian cuisine. This thriving Ethiopian restaurant is a testament to the city's rich diversity. The moment you step inside, the inviting aroma of roasted spices and freshly baked injera, a spongy flatbread, envelops you.Ethiopian cuisine is known for its communal dining style, where guests share platters of aromatic stews and dishes. Among the favorites are doro wat, a spicy chicken stew, and kitfo, a tartare-like dish of minced raw meat. The real stars are the spice blends, notably berbere and mitmita, which add depth and complexity to the flavors. The restaurant's warm ambiance and traditional décor create an immersive experience, allowing diners to appreciate not only the food but also the cultural richness of Ethiopia. From the intricate coffee ceremonies to the lively music, dining here is a memorable journey through East Africa's culinary heritage.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/ethioo.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/ethioooo.jpg"
   )

   Story12 = Story(
      user=random.choice(all_users), title="Exploring Alaskan Cuisine: A Taste of the Last Frontier", story_text="Alaskan cuisine is a true reflection of the state's natural bounty and unique culinary traditions. Located in the northernmost part of the United States, Alaska offers a remarkable tapestry of flavors that mirror its breathtaking landscapes. One cannot discuss Alaskan cuisine without mentioning the star of its seafood offerings: salmon. Alaskan salmon, whether grilled, smoked, or turned into a delightful chowder, is renowned for its pristine taste and quality. Additionally, the colossal king crab legs harvested from the icy waters are a delicacy that's as delicious as it is visually impressive. Beyond seafood, Alaskan cuisine incorporates indigenous elements, such as wild berries and game meats like caribou and moose. These ingredients feature prominently in dishes like akutaq, a traditional Yupik dessert made with berries, and stews that showcase the rich flavors of the wilderness. The fusion of indigenous traditions and culinary innovation makes dining in Alaska a must-visit experience for those seeking a taste of the Last Frontier.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/alas.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/alask.jpeg"
   )

   Story13 = Story(
      user=random.choice(all_users), title="The Art of Belgian Cuisine: Beyond Waffles and Chocolate", story_text="Belgian cuisine is often underestimated, with waffles and chocolates taking center stage in international recognition. However, Belgium offers a diverse and indulgent culinary experience that goes well beyond its famous sweets. One of Belgium's culinary treasures is moules-frites, a dish that combines plump mussels with perfectly crispy fries. The mussels are often cooked in a fragrant broth of white wine, garlic, and herbs, creating a symphony of flavors. Carbonnade flamande is another Belgian classic, featuring tender beef stewed in beer and served with a rich, savory gravy. The addition of beer to many Belgian dishes, both savory and sweet, is a testament to the nation's deep appreciation for this beloved beverage.Belgians also take pride in their cheese, with varieties like Chimay, Rochefort, and Brugge being beloved choices. Paired with a selection of beer, Belgian cheese tasting is an experience that showcases the country's rich culinary heritage.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/belg.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/belgia.png"
   )
   Story14 = Story(
      user=random.choice(all_users), title="Pupusas: El Salvador's Culinary Emblem", story_text="Pupusas, El Salvador's cherished national dish, symbolize the country's rich culture and history. With origins tracing back thousands of years, pupusas have evolved from indigenous traditions, enriched by Spanish colonization and African influences. These stuffed corn tortillas, typically filled with cheese, chicharrón, refried beans, or loroco, boast a unique blend of flavors and textures. Pupusas serve as a focal point for Salvadoran families, fostering a sense of community and preserving cultural heritage through generations. Found ubiquitously in El Salvador, pupusas are often paired with curtido, a tangy cabbage slaw, and tomato salsa. Beyond the country's borders, Salvadoran communities worldwide have introduced pupusas, expanding their global reach and showcasing Salvadoran cuisine's international appeal. In sum, pupusas encapsulate history, tradition, and flavor, embodying El Salvador's culinary and cultural richness.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/sal.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/salva.jpeg"
   )
   Story15 = Story(
      user=random.choice(all_users), title="Peruvian Cuisine: A Fusion of Flavors and Cultures", story_text="Peruvian cuisine is a culinary marvel, blending indigenous ingredients, Spanish influences, and Asian flavors to create a vibrant and diverse culinary tapestry. A standout dish in Peruvian gastronomy is ceviche, a refreshing concoction of fresh seafood marinated in zesty lime juice, often served with corn and sweet potatoes. Peruvian cuisine is also known for its vibrant spices, particularly ají amarillo peppers, which add a hint of heat to many dishes. Lomo saltado, for instance, is a popular stir-fry that combines marinated beef with onions, tomatoes, and aji amarillo, served alongside crispy fries and rice. The country's regional diversity further enriches its culinary landscape, with Amazonian specialties like juanes and highland delights like rocoto relleno. Whether you're exploring the coastal, mountain, or jungle regions, Peru offers an enticing gastronomic adventure for food enthusiasts.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/peru.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/peruv.jpeg"
   )
   Story16 = Story(
      user=random.choice(all_users), title="Savoring Lebanese Delights Near Washington, D.C.", story_text="Washington, D.C., boasts a vibrant Lebanese dining scene that beckons food lovers to explore the rich flavors of the Middle East. Lebanese restaurants in the area offer an authentic and delightful culinary journey. The hallmark of Lebanese cuisine is mezze, a collection of small, shareable dishes that showcase a wide array of flavors and textures. From creamy hummus and smoky baba ghanoush to succulent shawarma and fragrant tabbouleh, each bite is a burst of Middle Eastern goodness. The warmth of Lebanese hospitality is evident as diners are encouraged to linger over meals and enjoy the communal experience. The aromatic spices, the tender grilled meats, and the delicate desserts like baklava all contribute to making Lebanese dining a delightful and memorable experience, right in the heart of the nation's capital.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/leban.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/lebane.jpeg"
   )
   Story17 = Story(
      user=random.choice(all_users), title="Qatar's Pride: The National Dish, Machbous", story_text="In Qatar, there's no dish that captures the essence of the nation quite like machbous. This aromatic rice dish is a beloved symbol of Qatari cuisine, and it reflects the rich culinary heritage of the region. Machbous is a flavorful combination of tender chunks of meat, often lamb or chicken, infused with fragrant spices like saffron and turmeric. Dried lime adds a unique tangy note to the dish, while vegetables and herbs round out the flavors. It's traditionally served with a side of tangy yogurt and a fresh salad. This national dish not only delights the palate but also embodies the cultural significance of food in Qatar. It's a dish that invites locals and visitors alike to savor the tastes and traditions of this Arabian Gulf nation.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/qat.jpg", image_url_2="https://feedium-bucket.s3.amazonaws.com/qatari.jpeg"
   )
   Story18 = Story(
      user=random.choice(all_users), title="Egusi Soup: A Nutrient-Rich West African Delicacy", story_text="Egusi soup stands as a cherished culinary delight in West Africa, celebrated for its rich flavors and high nutritional value. This hearty soup, prepared from ground melon seeds, is a testament to the region's culinary diversity. A typical egusi soup incorporates leafy vegetables, palm oil, and an array of aromatic spices. The combination of ingredients creates a savory and nutty flavor profile, with a slight sweetness from the palm oil. One of the fascinating aspects of egusi soup is its versatility. It can be prepared with various proteins, including chicken, fish, or goat meat, allowing for a range of taste experiences. Egusi soup is not only a delicious dish but also a source of essential nutrients, making it a staple in the diet of many West African communities.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/egus.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/egusi.jpeg"
   )
   Story19 = Story(
      user=random.choice(all_users), title="Chilean Cuisine: A Taste of Traditional Flavors", story_text="Chilean cuisine, often overshadowed by the popularity of its neighboring countries, is a treasure trove of flavors that reflects the country's rich cultural heritage. While pastel de choclo stands as Chile's national dish, there is much more to explore. Pastel de choclo, a sweet corn pie, is a unique blend of sweet and savory flavors. It combines ground beef, chicken, olives, raisins, and hard-boiled eggs, all encased in a sweet corn crust. The dish encapsulates the fusion of indigenous and Spanish influences that characterize Chilean cuisine.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/chile.png", image_url_2="https://feedium-bucket.s3.amazonaws.com/chilean.jpeg"
   )
   Story20 = Story(
      user=random.choice(all_users), title="Ingredients for a Delectable Francesinha", story_text="Creating a Francesinha, a delectable Portuguese sandwich originating from Porto, requires a medley of tantalizing ingredients. At its core is a generous serving of tender, thinly-sliced cured meats, such as ham and linguica, whose savory and smoky flavors infuse the dish with richness. A succulent steak, cooked to perfection, forms another layer of indulgence. The sandwich's contents are then complemented by the creaminess of melted cheese, typically a blend of mozzarella and a local cheese called queijo da serra, draping over the meats like a luscious blanket. The magic of a Francesinha lies in its spicy sauce, which is a harmonious blend of tomatoes, beer, and piri-piri sauce, delivering a fiery kick to the palate. To achieve the perfect balance, a final touch of a fried egg crowns the creation. All these ingredients are enclosed within slices of thick, crusty bread, making the Francesinha a true gastronomic masterpiece, packed with contrasting textures and bold flavors that make it an iconic dish in Portuguese cuisine.", snap_count=random.randint(10, 40), image_url_1="https://feedium-bucket.s3.amazonaws.com/fran.jpeg", image_url_2="https://feedium-bucket.s3.amazonaws.com/franc.jpeg"
   )

   all_stories = [Story1, Story2, Story3, Story4, Story5, Story6, Story7, Story8, Story9, Story10, Story11, Story12, Story13, Story14, Story15, Story16, Story17, Story18, Story19, Story20]

   topic1 = Topic(name="Vegan")
   topic2 = Topic(name="Vegetarian")
   topic3 = Topic(name="Review")
   topic4 = Topic(name="Japanese")
   topic5 = Topic(name="Korean")
   topic6 = Topic(name="North African")
   topic7 = Topic(name="Pizza")
   topic8 = Topic(name="Opinion")
   topic9 = Topic(name="Recipe")
   topic10 = Topic(name="North Indian")
   topic11 = Topic(name="Ethiopian")
   topic12 = Topic(name="Alaskan")
   topic13 = Topic(name="Belgian")
   topic14 = Topic(name="Salvadoran")
   topic15 = Topic(name="Peruvian")
   topic16 = Topic(name="Lebanese")
   topic17 = Topic(name="Qatari")
   topic18 = Topic(name="Nigerian")
   topic19 = Topic(name="Ghanaian")
   topic20 = Topic(name="Chilean")
   topic21 = Topic(name="Portuguese")

   Story1.topics.append(topic3)
   Story1.topics.append(topic10)
   Story2.topics.append(topic8)
   Story3.topics.append(topic1)
   Story3.topics.append(topic9)
   Story4.topics.append(topic1)
   Story4.topics.append(topic8)
   Story5.topics.append(topic2)
   Story5.topics.append(topic8)
   Story6.topics.append(topic8)
   Story7.topics.append(topic3)
   Story7.topics.append(topic4)
   Story8.topics.append(topic6)
   Story8.topics.append(topic8)
   Story9.topics.append(topic3)
   Story9.topics.append(topic7)
   Story9.topics.append(topic8)
   Story10.topics.append(topic3)
   Story10.topics.append(topic5)
   Story11.topics.append(topic3)
   Story11.topics.append(topic11)
   Story12.topics.append(topic12)
   Story13.topics.append(topic13)
   Story14.topics.append(topic14)
   Story15.topics.append(topic15)
   Story16.topics.append(topic16)
   Story17.topics.append(topic17)
   Story18.topics.append(topic18)
   Story18.topics.append(topic19)
   Story19.topics.append(topic20)
   Story20.topics.append(topic9)
   Story20.topics.append(topic21)

   comment1 = Comment(
        story_id=random.randint(1, 20),
        user_id=random.randint(1, 3),
        comment_text="🤤🤤🤤🤤🤤🤤🤤",
    )
   comment2 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="WOWWW",
   )
   comment3 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="Not reading all that, nice profile pic tho 🫶"
   )
   comment4 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="This is making me so hungry!"
   )
   comment5 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="Love it!"
   )
   comment6 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="Wonderful!"
   )
   comment7 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="Amazing!"
   )
   comment8 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="Great content!!"
   )
   comment9 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="Thanks for sharing!!!"
   )
   comment10 = Comment(
      story_id=7,
      user_id=1,
      comment_text="nice post! promote it on @foodhub 🔥"
   )
   comment11 = Comment(
      story_id=7,
      user_id=2,
      comment_text="nice post! promote it on @ultimate_foodiez 🔥"
   )
   comment12 = Comment(
      story_id=7,
      user_id=3,
      comment_text="nice post! promote it on @food_finder 🔥"
   )
   comment13 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="Super!"
   )
   comment14 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="Incredible."
   )
   comment15 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="Excellent!"
   )
   comment16 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="amazing 🧎🧎🧎"
   )
   comment17 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="Thanks for sharing!"
   )
   comment18 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="Nice content."
   )
   comment19 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="Truly enlightening."
   )
   comment20 = Comment(
      story_id=random.randint(1, 20),
      user_id=random.randint(1, 3),
      comment_text="Profoundly informative."
   )

   # snap1 = Snap(
   #    user_id=1,
   #    story_id=1
   # )
   # snap2 = Snap(
   #    user_id=1,
   #    story_id=2,
   # )
   # snap3 = Snap(
   #    user_id=1,
   #    story_id=3,
   # )
   # snap4 = Snap(
   #    user_id=1,
   #    story_id=4,
   # )
   # snap5 = Snap(
   #    user_id=1,
   #    story_id=5,
   # )
   # snap6 = Snap(
   #    user_id=2,
   #    story_id=6,
   # )
   # snap7 = Snap(
   #    user_id=2,
   #    story_id=7,
   # )
   # snap8 = Snap(
   #    user_id=2,
   #    story_id=8,
   # )
   # snap9 = Snap(
   #    user_id=2,
   #    story_id=9,
   # )
   # snap10 = Snap(
   #    user_id=2,
   #    story_id=10,
   # )
   # snap11 = Snap(
   #    user_id=3,
   #    story_id=11,
   # )
   # snap12 = Snap(
   #    user_id=3,
   #    story_id=12,
   # )
   # snap13 = Snap(
   #    user_id=3,
   #    story_id=13,
   # )
   # snap14 = Snap(
   #    user_id=3,
   #    story_id=14,
   # )
   # snap15 = Snap(
   #    user_id=3,
   #    story_id=15,
   # )
   # snap16 = Snap(
   #    user_id=4,
   #    story_id=16,
   # )
   # snap17 = Snap(
   #    user_id=4,
   #    story_id=17,
   # )
   # snap18 = Snap(
   #    user_id=4,
   #    story_id=18,
   # )
   # snap19 = Snap(
   #    user_id=4,
   #    story_id=19,
   # )
   # snap20 = Snap(
   #    user_id=4,
   #    story_id=20,
   # )



   db.session.add_all([demo, marnie, bobbie, jon])
   db.session.add_all([Story1, Story2, Story3, Story4, Story5, Story6, Story7, Story8, Story9, Story10, Story11, Story12, Story13, Story14, Story15, Story16, Story17, Story18, Story19, Story20])
   db.session.add_all([topic1, topic2, topic3, topic4, topic4, topic5, topic6, topic7, topic8, topic9, topic10, topic11, topic12, topic13, topic14, topic15, topic16, topic17, topic18, topic19, topic20, topic21])
   db.session.add_all([comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20])
   db.session.commit()

def undo_users():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
  else:
      db.session.execute(text("DELETE FROM users"))

  db.session.commit()
