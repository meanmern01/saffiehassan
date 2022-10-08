import baseTransition from '@/transitions/base';
import fromAboutTransition from '@/transitions/from-about';
import fromTestingTransition from '@/transitions/from-testing';
import fromAnalysisTransition from '@/transitions/from-analysis';
import fromAnalysisDemographicsTransition from '@/transitions/from-analysis-demographics';
import fromAnalysisCosmeticConcernsTransition from '@/transitions/from-analysis-cosmetic-concerns';
import fromAnalysisWeatherTransition from '@/transitions/from-analysis-weather';
import fromIndexToIntroductionTransition from '@/transitions/from-index-to-introduction';
import fromIndexToTestingTransition from '@/transitions/from-index-to-testing';
import fromIndexToAboutTransition from '@/transitions/from-index-to-about';
import fromIntroductionToIndexTransition from '@/transitions/from-introduction-to-index';

export const transitions = [
    baseTransition,
    fromAboutTransition,
    fromTestingTransition,
    fromAnalysisTransition,
    fromAnalysisDemographicsTransition,
    fromAnalysisCosmeticConcernsTransition,
    fromAnalysisWeatherTransition,
    fromIndexToIntroductionTransition,
    fromIndexToTestingTransition,
    fromIndexToAboutTransition,
    fromIntroductionToIndexTransition,
];
