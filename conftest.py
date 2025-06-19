import pytest

from rest_framework.test import APIClient

# pytest_plugins = [
#     # app.test.fixtures
# ]

@pytest.fixture
def api_client():
    return APIClient()