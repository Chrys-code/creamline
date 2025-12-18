from apps.pasteurisation.use_cases.analytics.pasteurisation_time_series_analytics import (
    pasteurisation_time_series_analytics,
)


class PasteurisationTimeSeriesReader:
    """
    Exposes an interface for other bounded contexts (pdf_exports)
    """

    def get(self, params: dict):
        return pasteurisation_time_series_analytics(
            start_date=params.get("start_date"),
            end_date=params.get("end_date"),
            interval=params.get("interval", "day"),
            pasteur_uuid=params.get("pasteur_uuid"),
        )
