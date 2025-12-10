import React from "react";
import { ScrollView, View, Image } from "react-native";
import { List, Text, useTheme, Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useUserStore } from "~/hooks/useUserStore";
import { getAssets } from "~/utils/valorant-assets";
import { VItemTypes } from "~/utils/misc";

function Loadout() {
  const user = useUserStore(({ user }) => user);
  const { t } = useTranslation();
  const { colors } = useTheme();
  const assets = getAssets();

  const loadout = user.loadout;

  const ownedSprayIds = React.useMemo(() => {
    const ent = user.ownedItems?.entitlementsByTypes.find(
      (t) => t.itemTypeID === VItemTypes.Spray
    );
    return new Set(ent?.entitlements.map((e) => e.itemID) ?? []);
  }, [user]);

  if (!loadout) {
    return (
      <ScrollView style={{ padding: 10 }}>
        <Text>{t("loadout.empty")}</Text>
      </ScrollView>
    );
  }

  const renderGun = (gun: GunLoadout, index: number) => {
    const skin =
      assets.skins.find((s) => s.uuid === gun.skinID) ||
      assets.skins.find((s) => s.levels.some((l) => l.uuid === gun.skinLevelID));
    const chroma = skin?.chromas.find((c) => c.uuid === gun.chromaID);
    const charmLevel = assets.buddies
      .flatMap((b) => b.levels)
      .find((l) => l.uuid === gun.charmLevelID);

    const titleParts = [
      skin?.displayName ?? gun.skinID,
      chroma ? `(${chroma.displayName})` : undefined,
    ].filter(Boolean);

    const description = [
      charmLevel ? t("loadout.charm", { name: charmLevel.displayName }) : null,
    ]
      .filter(Boolean)
      .join(" • ");

    return (
      <List.Item
        key={`${gun.id}-${index}`}
        title={titleParts.join(" ")}
        description={description}
        left={(_props) => (
          <Image
            {..._props}
            source={{ uri: chroma?.fullRender || skin?.displayIcon }}
            style={{ width: 96, height: 48 }}
            resizeMode="contain"
          />
        )}
      />
    );
  };

  const renderSpray = (spray: SprayLoadout, index: number) => {
    const sprayAsset = assets.sprays.find((s) => s.uuid === spray.sprayID);
    return (
      <List.Item
        key={`${spray.equipSlotID}-${index}`}
        title={sprayAsset?.displayName ?? spray.sprayID}
        description={
          ownedSprayIds.has(spray.sprayID) ? t("owned") : t("not_owned")
        }
        left={(_props) =>
          sprayAsset ? (
            <Image
              {..._props}
              source={{ uri: sprayAsset.fullTransparentIcon }}
              style={{ width: 64, height: 64 }}
              resizeMode="contain"
            />
          ) : null
        }
      />
    );
  };

  const card = assets.cards.find((c) => c.uuid === loadout.identity.playerCardID);
  const titleAsset = assets.titles.find(
    (c) => c.uuid === loadout.identity.playerTitleID
  );

  return (
    <ScrollView style={{ padding: 10 }}>
      <List.Section title={t("loadout.guns")}>
        {loadout.guns.map(renderGun)}
      </List.Section>

      <Divider style={{ backgroundColor: colors.backdrop }} />

      <List.Section title={t("loadout.sprays")}>
        {loadout.sprays.map(renderSpray)}
      </List.Section>

      <Divider style={{ backgroundColor: colors.backdrop }} />

      <List.Section title={t("loadout.identity")}>
        <List.Item
          title={card?.displayName ?? t("loadout.player_card")}
          description={titleAsset?.titleText ?? loadout.identity.playerTitleID}
          left={(_props) =>
            card ? (
              <Image
                {..._props}
                source={{ uri: card.smallArt }}
                style={{ width: 64, height: 40 }}
                resizeMode="contain"
              />
            ) : null
          }
          right={(_props) => (
            <View style={{ justifyContent: "center", paddingRight: 10 }}>
              <Text>{t("loadout.level", { lvl: loadout.identity.accountLevel })}</Text>
            </View>
          )}
        />
      </List.Section>
    </ScrollView>
  );
}

export default Loadout;

