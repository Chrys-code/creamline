from apps.analytics.use_cases.milk_time_series_analytics import (
    milk_time_series_analytics,
)


class MilkTimeSeriesReader:
    """
    Exposes a clean interface for other bounded contexts (pdf_exports)
    """

    def get(self, params: dict):
        return milk_time_series_analytics(
            start_date=params.get("start_date"),
            end_date=params.get("end_date"),
            interval=params.get("interval", "day"),
            producer_uuid=params.get("producer_uuid"),
        )
