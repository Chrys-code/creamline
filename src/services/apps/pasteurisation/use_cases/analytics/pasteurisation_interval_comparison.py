from datetime import timedelta
from dateutil.relativedelta import relativedelta

from django.utils.timezone import now
from django.db.models import QuerySet
from django.db.models import Sum

from apps.pasteurisation.models import Pasteurisation


def _sum_liters(qs: QuerySet):
    return qs.aggregate(total=Sum("volume_liters"))["total"] or 0


def _pct_change(current, previous):
    if previous == 0:
        return 0
    return round(((current - previous) / previous) * 100, 2)


def pasteurisation_interval_comparison_data():
    """
    Used to return comparison pairs for time intervals. E.g: month to previous month.
    Returns the total in last period plus the % change since previous preiod.
    """

    # Main periods
    today = now()
    this_week_start = today.replace(
        day=today.day, hour=0, minute=0, second=0, microsecond=0
    ) - timedelta(days=today.weekday())
    this_month_start = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    this_year_start = today.replace(
        year=today.year, month=1, day=1, hour=0, minute=0, second=0, microsecond=0
    )

    # Previous periods for comparison
    prev_week_start = this_week_start - timedelta(days=7)
    prev_month_start = this_month_start - relativedelta(months=1)
    prev_year_start = this_year_start - relativedelta(years=1)

    qs = Pasteurisation.objects.all()

    # Current periods
    week_qs = qs.filter(created_at__date__gte=this_week_start)
    month_qs = qs.filter(created_at__date__gte=this_month_start)
    year_qs = qs.filter(created_at__date__gte=this_year_start)

    # Comparison periods
    prev_week_qs = qs.filter(
        created_at__date__gte=prev_week_start, created_at__date__lt=this_week_start
    )
    prev_month_qs = qs.filter(
        created_at__date__gte=prev_month_start, created_at__date__lt=this_month_start
    )
    prev_year_qs = qs.filter(
        created_at__date__gte=prev_year_start, created_at__date__lt=this_year_start
    )

    # SUMS
    week_total = _sum_liters(week_qs)
    prev_week_total = _sum_liters(prev_week_qs)

    month_total = _sum_liters(month_qs)
    prev_month_total = _sum_liters(prev_month_qs)

    year_total = _sum_liters(year_qs)
    prev_year_total = _sum_liters(prev_year_qs)

    return {
        "last_week_total": round(week_total),
        "last_week_change": _pct_change(week_total, prev_week_total),
        "last_month_total": round(month_total),
        "last_month_change": _pct_change(month_total, prev_month_total),
        "last_year_total": round(year_total),
        "last_year_change": _pct_change(year_total, prev_year_total),
    }
