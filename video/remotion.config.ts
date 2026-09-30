import { Config } from '@remotion/cli/config';
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.overrideWebpackConfig((config) => enableTailwind(config));
