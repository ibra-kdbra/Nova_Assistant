import {
  Link,
  Box,
  ChakraProvider,
  Heading,
  HStack,
  IconButton,
  Icon,
  Image,
  Flex,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { FaGithub } from "react-icons/fa6";
import { useState } from "react";
import { useAppState } from "../state/store";
import SetAPIKey from "./SetAPIKey";
import TaskUI from "./TaskUI";
import Settings from "./Settings";

const App = () => {
  const hasAPIKey = useAppState(
    (state) => state.settings.anthropicKey || state.settings.openAIKey,
  );
  const [inSettingsView, setInSettingsView] = useState(false);

  return (
    <ChakraProvider>
      <Box p="8" pb="24" fontSize="lg" w="full">
        <HStack mb={4} justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Heading as="h1" size="lg">
              Nova
            </Heading>
            <Image src="/nova.png" width="8" height="8" alt="nova logo" />
          </Flex>
          {hasAPIKey && (
            <IconButton
              icon={<SettingsIcon />}
              onClick={() => setInSettingsView(true)}
              aria-label="open settings"
            />
          )}
        </HStack>
        {hasAPIKey ? (
          inSettingsView ? (
            <Settings setInSettingsView={setInSettingsView} />
          ) : (
            <TaskUI />
          )
        ) : (
          <SetAPIKey asInitializerView />
        )}
      </Box>
      <Box
        px="8"
        pos="fixed"
        w="100%"
        bottom={0}
        zIndex={2}
        as="footer"
        backdropFilter="auto"
        backdropBlur="6px"
        backgroundColor="rgba(255, 255, 255, 0.6)"
      >
        <HStack
          columnGap="1.5rem"
          rowGap="0.5rem"
          fontSize="md"
          borderTop="1px dashed gray"
          py="3"
          justify="center"
          shouldWrapChildren
          wrap="wrap"
        >
          <Link
            href="https://github.com/ibra-kdbra/Nova_Assistant#readme"
            isExternal
          >
            About this project
          </Link>
          <Link href="https://github.com/ibra-kdbra/Nova_Assistant" isExternal>
            GitHub <Icon verticalAlign="text-bottom" as={FaGithub} />
          </Link>
        </HStack>
      </Box>
    </ChakraProvider>
  );
};

export default App;
