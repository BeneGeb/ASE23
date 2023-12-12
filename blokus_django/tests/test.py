from django.test import TestCase


class FooTest(TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def this_wont_run(self):
        pass

    def test_this_will(self):
        pass