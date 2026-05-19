package gay.xujun.whim.registry;

import gay.xujun.whim.Whim;
import net.minecraft.core.Registry;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.core.registries.Registries;
import net.minecraft.resources.Identifier;
import net.minecraft.resources.ResourceKey;
import net.minecraft.world.item.BlockItem;
import net.minecraft.world.item.Item;

import java.util.function.Function;

public class ItemRegistry {

    public static final Item TEST_ITEM = register("test_item", Item::new, new Item.Properties());
    public static final Item TEST_BLOCK_ITEM = register("test_block", (properties) -> new BlockItem(BlockRegistry.TEST_BLOCK, properties), new Item.Properties());

    public static final Item RED_FUNDOSHI = register("red_fundoshi", Item::new, new Item.Properties());
    public static final Item WHITE_FUNDOSHI = register("white_fundoshi", Item::new, new Item.Properties());
    public static final Item BLACK_BRIEF = register("black_brief", Item::new, new Item.Properties());
    public static final Item WHITE_BRIEF = register("white_brief", Item::new, new Item.Properties());

    public static final Item RED_FUNDOSHI_BLOCK_ITEM = register("red_fundoshi_block", (properties) -> new BlockItem(BlockRegistry.RED_FUNDOSHI_BLOCK, properties), new Item.Properties());
    public static final Item WHITE_FUNDOSHI_BLOCK = register("white_fundoshi_block", (properties) -> new BlockItem(BlockRegistry.WHITE_FUNDOSHI_BLOCK, properties), new Item.Properties());
    public static final Item BLACK_BRIEF_BLOCK = register("black_brief_block", (properties) -> new BlockItem(BlockRegistry.BLACK_BRIEF_BLOCK, properties), new Item.Properties());
    public static final Item WHITE_BRIEF_BLOCK = register("white_brief_block", (properties) -> new BlockItem(BlockRegistry.WHITE_BRIEF_BLOCK, properties), new Item.Properties());
    public static final Item NUDE_BLOCK = register("nude_block", (properties) -> new BlockItem(BlockRegistry.NUDE_BLOCK, properties), new Item.Properties());


    public static <T extends Item> T register(String name, Function<Item.Properties, T> itemFactory, Item.Properties setting){
        ResourceKey<Item> itemkey = ResourceKey.create(Registries.ITEM, Identifier.fromNamespaceAndPath(Whim.MOD_ID, name));
        T item = itemFactory.apply(setting.setId(itemkey));
        Registry.register(BuiltInRegistries.ITEM, itemkey, item);
        return item;
    }

    public static void registerItem() {
        Whim.LOGGER.info("Registering Item");
    }
}